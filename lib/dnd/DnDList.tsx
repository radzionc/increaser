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
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { DnDItem } from './DnDItem'

export type ItemChangeParams = {
  order: number
}

type RenderListParams = {
  content: ReactNode
  containerProps?: Record<string, any>
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

export type DnDListProps<ItemId extends UniqueIdentifier, Item> = {
  items: Item[]
  getItemOrder: (item: Item) => number
  getItemId: (item: Item) => ItemId
  onChange: (itemId: ItemId, params: ItemChangeParams) => void
  renderList: (params: RenderListParams) => ReactNode
  renderItem: (params: RenderItemParams<Item>) => ReactNode
  renderDragOverlay?: (params: RenderDragOverlayParams<Item>) => ReactNode
}

export function DnDList<ItemId extends UniqueIdentifier, Item>({
  items,
  getItemOrder,
  getItemId,
  onChange,
  renderItem,
  renderList,
  renderDragOverlay,
}: DnDListProps<ItemId, Item>) {
  const droppableId = useId()
  const [activeItemId, setActiveItemId] = useState<ItemId | null>(null)

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01,
    },
  })

  const sensors = useSensors(pointerSensor)

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setActiveItemId(null)
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

      onChange(active.id as ItemId, { order: newOrder })
    },
    [getItemOrder, items, onChange],
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveItemId(active.id as ItemId)}
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
        })}
        {renderDragOverlay && (
          <DragOverlay>
            {activeItemId
              ? renderDragOverlay({
                  item: shouldBePresent(
                    items.find((item) => getItemId(item) === activeItemId),
                  ),
                })
              : null}
          </DragOverlay>
        )}
      </SortableContext>
    </DndContext>
  )
}
