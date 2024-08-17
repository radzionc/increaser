import { getNewOrder } from '@lib/utils/order/getNewOrder'
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragEndEvent,
  DragOverlay,
  CollisionDetection,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  MeasuringStrategy,
} from '@dnd-kit/core'
import { order } from '@lib/utils/array/order'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { toEntries } from '@lib/utils/record/toEntries'
import { DnDItem } from '../DnDItem'
import { DnDGroup } from './DnDGroup'
import { getDndGroupsItemDestination } from './getDnDGroupsItemDestination'
import { getDndGroupsItemSource } from './getDnDGroupsItemSource'
import { areEqualDnDGroupsItemLocations } from './DnDGroupsItemLocation'

export type ItemChangeParams<
  GroupId extends string,
  ItemId extends UniqueIdentifier,
> = {
  id: ItemId
  order: number
  groupId: GroupId
}

type RenderGroupParams<GroupId extends string> = {
  groupId: GroupId
  content: ReactNode
  containerProps?: Record<string, any>
  isDraggingOver: boolean
}

type RenderItemParams<Item> = {
  item: Item
  draggableProps: Record<string, any>
  dragHandleProps: Record<string, any>
  isDragging: boolean
}

type RenderDragOverlayParams<Item> = {
  item: Item
}

export type DnDGroupsProps<
  GroupId extends string,
  ItemId extends UniqueIdentifier,
  Item,
> = {
  items: Item[]
  toGroups: (items: Item[]) => Record<GroupId, Item[]>
  simulateChange: (
    items: Item[],
    params: ItemChangeParams<GroupId, ItemId>,
  ) => Item[]
  getGroupOrder: (groupId: GroupId) => number
  getItemOrder: (item: Item) => number
  getItemId: (item: Item) => ItemId
  onChange: (params: ItemChangeParams<GroupId, ItemId>) => void
  renderGroup: (params: RenderGroupParams<GroupId>) => ReactNode
  renderItem: (params: RenderItemParams<Item>) => ReactNode
  renderDragOverlay?: (params: RenderDragOverlayParams<Item>) => ReactNode
}

export function DnDGroups<
  GroupId extends string,
  ItemId extends UniqueIdentifier,
  Item,
>({
  items: finalItems,
  toGroups,
  getItemOrder,
  getItemId,
  simulateChange,
  onChange,
  renderGroup,
  renderItem,
  renderDragOverlay,
  getGroupOrder,
}: DnDGroupsProps<GroupId, ItemId, Item>) {
  const [items, setItems] = useState(finalItems)
  useEffect(() => {
    setItems(finalItems)
  }, [finalItems])

  const groups = useMemo(() => toGroups(items), [toGroups, items])

  const [activeItemId, setActiveItemId] = useState<ItemId | null>(null)

  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false
    })
  }, [groups])

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  })

  const sensors = useSensors(pointerSensor)

  const getOrderedItems = useCallback(
    (groupId: GroupId) => order(groups[groupId], getItemOrder, 'asc'),
    [groups, getItemOrder],
  )

  const getItemGroupId = useCallback(
    (itemId: ItemId) => {
      const entry = toEntries(groups).find(({ value }) =>
        value.some((item) => getItemId(item) === itemId),
      )
      return shouldBePresent(entry).key
    },
    [groups, getItemId],
  )

  const getItemIndex = useCallback(
    (itemId: ItemId) => {
      const groupId = getItemGroupId(itemId)

      return getOrderedItems(groupId).findIndex(
        (item) => getItemId(item) === itemId,
      )
    },
    [getItemGroupId, getItemId, getOrderedItems],
  )

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setActiveItemId(null)
      if (!over) {
        return
      }

      const source = getDndGroupsItemSource<GroupId, ItemId>({
        item: active,
        getItemIndex,
      })

      const destination = getDndGroupsItemDestination<GroupId, ItemId>({
        item: over,
        getItemIndex,
      })

      if (areEqualDnDGroupsItemLocations(source, destination)) {
        return
      }

      const isSameGroup = source.groupId === destination.groupId

      const changeParams = {
        id: active.id as ItemId,
        order: getNewOrder({
          orders: getOrderedItems(source.groupId).map(getItemOrder),
          sourceIndex: isSameGroup ? source.index : null,
          destinationIndex: destination.index,
        }),
        groupId: destination.groupId,
      }

      setItems(simulateChange(items, changeParams))
      onChange(changeParams)
    },
    [
      getItemIndex,
      getItemOrder,
      getOrderedItems,
      items,
      onChange,
      simulateChange,
    ],
  )

  const handleDragOver = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over) {
        return
      }

      const source = getDndGroupsItemSource<GroupId, ItemId>({
        item: active,
        getItemIndex,
      })

      const destination = getDndGroupsItemDestination<GroupId, ItemId>({
        item: over,
        getItemIndex,
      })

      if (source.groupId === destination.groupId) {
        return
      }

      recentlyMovedToNewContainer.current = true

      const changeParams = {
        id: active.id as ItemId,
        order: getNewOrder({
          orders: getOrderedItems(source.groupId).map(getItemOrder),
          sourceIndex: null,
          destinationIndex: destination.index,
        }),
        groupId: destination.groupId,
      }
      setItems(simulateChange(items, changeParams))
    },
    [getItemIndex, getItemOrder, getOrderedItems, items, simulateChange],
  )

  const groupKeys = order(getRecordKeys(groups), getGroupOrder, 'asc')

  const collisionDetectionStrategy: CollisionDetection = useCallback((args) => {
    const pointerIntersections = pointerWithin(args)
    const intersections =
      pointerIntersections.length > 0
        ? pointerIntersections
        : rectIntersection(args)

    const overId = getFirstCollision(intersections, 'id')

    if (overId !== null) {
      lastOverId.current = overId

      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [])

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActiveItemId(active.id as ItemId)}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={() => {
        setActiveItemId(null)
        setItems(finalItems)
      }}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
    >
      {groupKeys.map((groupId) => {
        const items = getOrderedItems(groupId)
        return (
          <DnDGroup
            key={groupId}
            id={groupId}
            itemIds={items.map(getItemId)}
            render={(params) =>
              renderGroup({
                groupId,
                ...params,
                content: (
                  <>
                    {items.map((item) => {
                      const key = getItemId(item)
                      return (
                        <DnDItem
                          key={key}
                          id={key}
                          render={(params) => renderItem({ item, ...params })}
                        />
                      )
                    })}
                  </>
                ),
              })
            }
          />
        )
      })}

      {renderDragOverlay && activeItemId && (
        <DragOverlay>
          {renderDragOverlay({
            item: shouldBePresent(
              groupKeys
                .flatMap((groupId) => groups[groupId])
                .find((item) => getItemId(item) === activeItemId),
            ),
          })}
        </DragOverlay>
      )}
    </DndContext>
  )
}
