import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { ReactNode, useCallback, useId, useState } from 'react'
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
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export type ItemChangeParams = {
  order: number
}

type RenderListParams = {
  content: ReactNode
  containerProps?: Record<string, any>
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

export type DnDListProps<I, ID extends UniqueIdentifier> = {
  items: I[]
  getItemOrder: (item: I) => number
  getItemId: (item: I) => ID
  onChange: (itemId: ID, params: ItemChangeParams) => void
  renderList: (params: RenderListParams) => ReactNode
  renderItem: (params: RenderItemParams<I>) => ReactNode
  renderDragOverlay?: (item: RenderDragOverlayParams<I>) => ReactNode
}

export function DnDList<I, ID extends UniqueIdentifier>({
  items,
  getItemOrder,
  getItemId,
  onChange,
  renderItem,
  renderList,
  renderDragOverlay,
}: DnDListProps<I, ID>) {
  const droppableId = useId()
  const [activeId, setActiveId] = useState<ID | null>(null)

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

      const oldIndex = items.findIndex((item) => getItemId(item) === active.id)
      const newIndex = items.findIndex((item) => getItemId(item) === over.id)

      const newOrder = getNewOrder({
        orders: items.map(getItemOrder),
        sourceIndex: oldIndex,
        destinationIndex: newIndex,
      })

      onChange(active.id as ID, { order: newOrder })
    },
    [getItemOrder, items, onChange],
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveId(active.id as ID)}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(getItemId)}
        strategy={verticalListSortingStrategy}
      >
        {renderList({
          containerProps: {
            'data-droppable-id': droppableId,
          },
          content: (
            <>
              {items.map((item, index) => {
                const key = getItemId(item)
                const isDragging = activeId === key
                return (
                  <SortableItem
                    key={key}
                    id={key}
                    index={index}
                    item={item}
                    renderItem={renderItem}
                    isDragging={isDragging}
                  />
                )
              })}
            </>
          ),
        })}
        {renderDragOverlay && (
          <DragOverlay>
            {activeId
              ? renderDragOverlay({
                  item: shouldBePresent(
                    items.find((item) => getItemId(item) === activeId),
                  ),
                })
              : null}
          </DragOverlay>
        )}
      </SortableContext>
    </DndContext>
  )
}

type SortableItemProps<I, ID extends UniqueIdentifier> = {
  id: ID
  index: number
  item: I
  renderItem: (params: RenderItemParams<I>) => ReactNode
  isDragging: boolean
}

function SortableItem<I, ID extends UniqueIdentifier>({
  id,
  item,
  renderItem,
  isDragging,
}: SortableItemProps<I, ID>) {
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
