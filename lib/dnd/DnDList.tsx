import { getNewOrder } from '@lib/utils/order/getNewOrder'
import {
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react'
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
import { order } from '@lib/utils/array/order'

export type ItemChangeParams<ItemId extends UniqueIdentifier> = {
  id: ItemId
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
  onChange: (params: ItemChangeParams<ItemId>) => void
  simulateChange: (items: Item[], params: ItemChangeParams<ItemId>) => Item[]
  renderList: (params: RenderListParams) => ReactNode
  renderItem: (params: RenderItemParams<Item>) => ReactNode
  renderDragOverlay?: (params: RenderDragOverlayParams<Item>) => ReactNode
}

export function DnDList<ItemId extends UniqueIdentifier, Item>({
  items: finalItems,
  getItemOrder,
  getItemId,
  onChange,
  simulateChange,
  renderItem,
  renderList,
  renderDragOverlay,
}: DnDListProps<ItemId, Item>) {
  const [items, setItems] = useState(finalItems)
  useEffect(() => {
    setItems(finalItems)
  }, [finalItems])

  const orderedItems = useMemo(
    () => order(items, getItemOrder, 'asc'),
    [getItemOrder, items],
  )

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

      const oldIndex = orderedItems.findIndex(
        (item) => getItemId(item) === active.id,
      )
      const newIndex = orderedItems.findIndex(
        (item) => getItemId(item) === over.id,
      )

      const newOrder = getNewOrder({
        orders: orderedItems.map(getItemOrder),
        sourceIndex: oldIndex,
        destinationIndex: newIndex,
      })

      const changeParams = { id: active.id as ItemId, order: newOrder }
      setItems(simulateChange(items, changeParams))
      onChange(changeParams)
    },
    [getItemId, getItemOrder, items, onChange, orderedItems, simulateChange],
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveItemId(active.id as ItemId)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActiveItemId(null)
        setItems(finalItems)
      }}
    >
      <SortableContext
        items={orderedItems.map(getItemId)}
        strategy={verticalListSortingStrategy}
      >
        {renderList({
          containerProps: {
            'data-droppable-id': droppableId,
          },
          content: (
            <>
              {orderedItems.map((item) => {
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
