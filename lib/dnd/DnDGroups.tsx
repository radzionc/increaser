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
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { order } from '@lib/utils/array/order'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export type ItemChangeParams<G> = {
  order: number
  groupId: G
}

type RenderGroupParams<G> = {
  groupId: G
  content: ReactNode
  containerProps?: Record<string, any>
  isDraggingOver: boolean
}

type RenderItemParams<I> = {
  item: I
  draggableProps?: Record<string, any>
  dragHandleProps?: Record<string, any> | null
  isDragging: boolean
}

type RenderDragOverlayParams<I> = {
  item: I
}

export type DnDGroupsProps<
  G extends UniqueIdentifier,
  I extends UniqueIdentifier,
  T,
> = {
  groups: Record<G, T[]>
  getGroupOrder: (group: G) => number
  getItemOrder: (item: T) => number
  getItemId: (item: T) => I
  onChange: (itemId: I, params: ItemChangeParams<G>) => void
  renderGroup: (params: RenderGroupParams<G>) => ReactNode
  renderItem: (params: RenderItemParams<T>) => ReactNode
  renderDragOverlay?: (params: RenderDragOverlayParams<T>) => ReactNode
}

export function DnDGroups<
  G extends UniqueIdentifier,
  I extends UniqueIdentifier,
  T,
>({
  groups,
  getItemOrder,
  getItemId,
  onChange,
  renderGroup,
  renderItem,
  renderDragOverlay,
  getGroupOrder,
}: DnDGroupsProps<G, I, T>) {
  const [activeId, setActiveId] = useState<I | null>(null)

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  })

  const sensors = useSensors(pointerSensor)

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setActiveId(null)
      if (!over || active.id === over.id) {
        return
      }

      const isSameGroup =
        active.data.current?.groupId === over.data.current?.groupId
      const groupId = over.data.current?.groupId as G
      const sourceGroup = active.data.current?.groupId as G

      if (!isSameGroup) {
        const items = order(groups[groupId] || [], getItemOrder, 'asc')
        onChange(active.id as I, {
          order: getNewOrder({
            orders: items.map(getItemOrder),
            sourceIndex: null,
            destinationIndex: items.findIndex(
              (item) => getItemId(item) === over.id,
            ),
          }),
          groupId,
        })
      } else {
        const items = order(groups[groupId] || [], getItemOrder, 'asc')
        onChange(active.id as I, {
          order: getNewOrder({
            orders: items.map(getItemOrder),
            sourceIndex: items.findIndex(
              (item) => getItemId(item) === active.id,
            ),
            destinationIndex: items.findIndex(
              (item) => getItemId(item) === over.id,
            ),
          }),
          groupId: sourceGroup,
        })
      }
    },
    [getItemOrder, groups, onChange],
  )

  const groupKeys = order(getRecordKeys(groups), getGroupOrder, 'asc')

  // Flatten the groups into a single array for finding the active item
  const flattenedItems = groupKeys.flatMap((groupId) => groups[groupId])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveId(active.id as I)}
      onDragEnd={handleDragEnd}
    >
      {groupKeys.map((groupId) => {
        const items = order(groups[groupId] || [], getItemOrder, 'asc')

        return (
          <SortableContext
            key={groupId}
            items={items.map(getItemId)}
            strategy={verticalListSortingStrategy}
          >
            {renderGroup({
              groupId,
              isDraggingOver: activeId
                ? items.some((item) => getItemId(item) === activeId)
                : false,
              containerProps: {
                'data-droppable-id': groupId,
              },
              content: (
                <>
                  {items.map((item) => {
                    const key = getItemId(item)
                    const isDragging = activeId === key
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
      })}

      {renderDragOverlay && activeId && (
        <DragOverlay>
          {renderDragOverlay({
            item: shouldBePresent(
              flattenedItems.find((item) => getItemId(item) === activeId),
            ),
          })}
        </DragOverlay>
      )}
    </DndContext>
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
        dragHandleProps: listeners,
        isDragging: isDragging,
      })}
    </>
  )
}
