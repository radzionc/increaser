import { VStack } from '@lib/ui/css/stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { CurrentHabitProvider } from '@increaser/ui/habits/CurrentHabitProvider'
import { HabitItem } from './HabitItem'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { DnDList } from '@lib/dnd/DnDList'
import { Wrap } from '@lib/ui/base/Wrap'
import { DraggableTightListItemContainer } from '@lib/ui/list/DraggableTightListItemContainer'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { useEffect, useState } from 'react'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { EditHabitForm } from '@increaser/ui/habits/form/EditHabitForm'
import { useHabits } from '@increaser/ui/habits/hooks/useHabits'

export const Habits = () => {
  const habits = useHabits()

  const [items, setItems] = useState(() => sortEntitiesWithOrder(habits))
  useEffect(() => {
    setItems(sortEntitiesWithOrder(habits))
  }, [habits])

  const [activeItemId, setActiveItemId] = useActiveItemId()

  const { mutate: updateHabit } = useUpdateUserEntityMutation('habit')

  return (
    <DnDList
      items={items}
      getItemId={(item) => item.id}
      onChange={(id, { index }) => {
        const order = getNewOrder({
          orders: items.map((item) => item.order),
          sourceIndex: items.findIndex((item) => item.id === id),
          destinationIndex: index,
        })

        updateHabit({
          id,
          fields: {
            order,
          },
        })

        setItems((prev) =>
          sortEntitiesWithOrder(
            prev.map((item) => (item.id === id ? { ...item, order } : item)),
          ),
        )
      }}
      renderList={({ props }) => <VStack {...props} />}
      renderItem={({ item, draggableProps, dragHandleProps, status }) => {
        const isEditing = activeItemId === item.id

        return (
          <CurrentHabitProvider key={item.id} value={item}>
            {isEditing ? (
              <PanelModal onFinish={() => setActiveItemId(null)}>
                <EditHabitForm onFinish={() => setActiveItemId(null)} />
              </PanelModal>
            ) : (
              <Wrap
                wrap={
                  activeItemId === null
                    ? (children) =>
                        status === 'overlay' ? (
                          <TightListItemDragOverlay>
                            {children}
                          </TightListItemDragOverlay>
                        ) : (
                          <DraggableTightListItemContainer
                            isDragging={status === 'placeholder'}
                            {...draggableProps}
                            {...dragHandleProps}
                          >
                            {children}
                          </DraggableTightListItemContainer>
                        )
                    : undefined
                }
              >
                <HabitItem onClick={() => setActiveItemId(item.id)} />
              </Wrap>
            )}
          </CurrentHabitProvider>
        )
      }}
    />
  )
}
