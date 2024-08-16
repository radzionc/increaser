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
  useDroppable,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { order } from '@lib/utils/array/order'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { toEntries } from '@lib/utils/record/toEntries'

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

      const sourceGroupId = getItemGroupId(active.id as ItemId)
      const sourceIndex = getItemIndex(active.id as ItemId)
      const destinationGroupId = getItemGroupId(over.id as ItemId)
      const destinationIndex = getItemIndex(over.id as ItemId)

      const isSameGroup = sourceGroupId === destinationGroupId

      if (isSameGroup && destinationIndex === sourceIndex) {
        return
      }

      onChange(active.id as ItemId, {
        order: getNewOrder({
          orders: getOrderedItems(sourceGroupId).map(getItemOrder),
          sourceIndex: isSameGroup ? sourceIndex : null,
          destinationIndex: destinationIndex,
        }),
        groupId: destinationGroupId,
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
        return (
          <DroppableGroup
            key={groupId}
            groupId={groupId}
            items={getOrderedItems(groupId)}
            activeItemId={activeItemId}
            renderGroup={renderGroup}
            renderItem={renderItem}
            getItemId={getItemId}
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

type DroppableGroupProps<
  GroupId extends string,
  ItemId extends UniqueIdentifier,
  Item,
> = {
  groupId: GroupId
  items: Item[]
  activeItemId: ItemId | null
  renderGroup: (params: RenderGroupParams<GroupId>) => ReactNode
  renderItem: (params: RenderItemParams<Item>) => ReactNode
  getItemId: (item: Item) => ItemId
}

function DroppableGroup<
  GroupId extends string,
  ItemId extends UniqueIdentifier,
  Item,
>({
  groupId,
  items,
  activeItemId,
  renderGroup,
  renderItem,
  getItemId,
}: DroppableGroupProps<GroupId, ItemId, Item>) {
  const { setNodeRef, isOver } = useDroppable({
    id: groupId,
  })

  return (
    <SortableContext
      id={groupId.toString()}
      items={items.map(getItemId)}
      strategy={verticalListSortingStrategy}
    >
      {renderGroup({
        groupId,
        isDraggingOver: isOver,
        containerProps: {
          'data-droppable-id': groupId,
          ref: setNodeRef,
        },
        content: (
          <>
            {items.map((item) => {
              const key = getItemId(item)
              const isDragging = activeItemId === key
              return (
                <SortableItem
                  key={key}
                  id={key}
                  item={item}
                  renderItem={renderItem}
                  isDragging={isDragging}
                />
              )
            })}
          </>
        ),
      })}
    </SortableContext>
  )
}

type SortableItemProps<I extends UniqueIdentifier, T> = {
  id: I
  item: T
  renderItem: (params: RenderItemParams<T>) => ReactNode
  isDragging: boolean
}

function SortableItem<I extends UniqueIdentifier, T>({
  id,
  item,
  renderItem,
  isDragging,
}: SortableItemProps<I, T>) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  }

  return (
    <>
      {renderItem({
        item,
        draggableProps: {
          ...attributes,
          ref: setNodeRef,
          style,
        },
        dragHandleProps: {
          ...listeners,
        },
        isDragging: isDragging,
      })}
    </>
  )
}
