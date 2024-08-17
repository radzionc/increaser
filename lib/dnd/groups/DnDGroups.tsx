import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragEndEvent,
  DragOverlay,
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
import {
  areEqualDnDGroupsItemLocations,
  DnDGroupsItemLocation,
} from './DnDGroupsItemLocation'

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

type ActiveItem<GroupId extends string> = {
  id: string
  source: DnDGroupsItemLocation<GroupId>
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

  const [activeItem, setActiveItem] = useState<ActiveItem<GroupId> | null>(null)

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
    (groups: Record<GroupId, Item[]>, itemId: ItemId) => {
      const entry = toEntries(groups).find(({ value }) =>
        value.some((item) => getItemId(item) === itemId),
      )
      return shouldBePresent(entry).key
    },
    [getItemId],
  )

  const getItemIndex = useCallback(
    (itemId: ItemId) => {
      const groupId = getItemGroupId(groups, itemId)

      return getOrderedItems(groupId).findIndex(
        (item) => getItemId(item) === itemId,
      )
    },
    [getItemGroupId, getItemId, getOrderedItems, groups],
  )

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!activeItem) {
        return
      }
      const { source: intitalSource } = activeItem

      setActiveItem(null)

      if (!over) {
        return
      }

      const destination = getDndGroupsItemDestination<GroupId, ItemId>({
        item: over,
        getItemIndex,
      })

      if (areEqualDnDGroupsItemLocations(intitalSource, destination)) {
        return
      }

      const source = getDndGroupsItemSource<GroupId, ItemId>({
        item: active,
        getItemIndex,
      })

      const isSameGroup = source.groupId === destination.groupId

      const newItems = simulateChange(items, {
        id: active.id as ItemId,
        order: getNewOrder({
          orders: getOrderedItems(source.groupId).map(getItemOrder),
          sourceIndex: isSameGroup ? source.index : null,
          destinationIndex: destination.index,
        }),
        groupId: destination.groupId,
      })

      setItems(newItems)

      const groups = toGroups(newItems)
      const groupId = getItemGroupId(groups, active.id as ItemId)
      const order = getItemOrder(
        shouldBePresent(
          groups[groupId].find((item) => getItemId(item) === active.id),
        ),
      )

      onChange({
        id: active.id as ItemId,
        order,
        groupId,
      })
    },
    [
      activeItem,
      getItemGroupId,
      getItemId,
      getItemIndex,
      getItemOrder,
      getOrderedItems,
      items,
      onChange,
      simulateChange,
      toGroups,
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

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActiveItem({
          id: active.id as string,
          source: getDndGroupsItemSource<GroupId, ItemId>({
            item: active,
            getItemIndex,
          }),
        })
      }}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={() => {
        setActiveItem(null)
        setItems(finalItems)
      }}
      // collisionDetection={closestCorners}
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

      {renderDragOverlay && activeItem && (
        <DragOverlay>
          {renderDragOverlay({
            item: shouldBePresent(
              items.find((item) => getItemId(item) === activeItem.id),
            ),
          })}
        </DragOverlay>
      )}
    </DndContext>
  )
}
