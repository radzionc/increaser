import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { ReactNode, useCallback, useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragEndEvent,
  DragOverlay,
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

export type ItemChangeParams<GroupId extends string> = {
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
  groups: Record<GroupId, Item[]>
  getGroupOrder: (groupId: GroupId) => number
  getItemOrder: (item: Item) => number
  getItemId: (item: Item) => ItemId
  onChange: (itemId: ItemId, params: ItemChangeParams<GroupId>) => void
  renderGroup: (params: RenderGroupParams<GroupId>) => ReactNode
  renderItem: (params: RenderItemParams<Item>) => ReactNode
  renderDragOverlay?: (params: RenderDragOverlayParams<Item>) => ReactNode
}

export function DnDGroups<
  GroupId extends string,
  ItemId extends UniqueIdentifier,
  Item,
>({
  groups,
  getItemOrder,
  getItemId,
  onChange,
  renderGroup,
  renderItem,
  renderDragOverlay,
  getGroupOrder,
}: DnDGroupsProps<GroupId, ItemId, Item>) {
  const [activeItemId, setActiveItemId] = useState<ItemId | null>(null)

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
    [groups, getItemGroupId, getItemId],
  )

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setActiveItemId(null)
      if (!over || active.id === over.id) {
        return
      }

      console.log({ active, over })

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

      onChange(active.id as ItemId, {
        order: getNewOrder({
          orders: getOrderedItems(source.groupId).map(getItemOrder),
          sourceIndex: isSameGroup ? source.index : null,
          destinationIndex: destination.index,
        }),
        groupId: destination.groupId,
      })
    },
    [getItemOrder, groups, onChange],
  )

  const groupKeys = order(getRecordKeys(groups), getGroupOrder, 'asc')

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveItemId(active.id as ItemId)}
      onDragEnd={handleDragEnd}
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
