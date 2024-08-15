import { VStack } from '@lib/ui/layout/Stack'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { CurrentHabitProvider } from '@increaser/ui/habits/CurrentHabitProvider'
import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { HabitItem } from './HabitItem'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { useEffect, useState } from 'react'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { DnDList } from '@lib/dnd/DnDList'
import { Wrap } from '@lib/ui/base/Wrap'
import { DraggableTightListItemContainer } from '@lib/ui/list/DraggableTightListItemContainer'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { EditHabitForm } from './form/EditHabitForm'
import { HabitItemContent } from './HabitItemContent'

export const Habits = () => {
  const { habits } = useHabits()

  const [items, setItems] = useState(habits)
  useEffect(() => {
    setItems(habits)
  }, [habits])

  const [activeItemId] = useActiveItemId()

  const { mutate: updateHabit } = useUpdateUserEntityMutation('habit')

  return (
    <DnDList
      items={sortEntitiesWithOrder(items)}
      getItemId={(item) => item.id}
      getItemOrder={(item) => item.order}
      onChange={(id, { order }) => {
        updateHabit({
          id,
          fields: {
            order,
          },
        })
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, order } : item)),
        )
      }}
      renderList={({ content, containerProps }) => (
        <VStack {...containerProps}>{content}</VStack>
      )}
      renderDragOverlay={({ item }) => (
        <TightListItemDragOverlay>
          <CurrentHabitProvider value={item}>
            <HabitItemContent />
          </CurrentHabitProvider>
        </TightListItemDragOverlay>
      )}
      renderItem={({ item, draggableProps, dragHandleProps, isDragging }) => {
        return (
          <Wrap
            wrap={
              activeItemId === null
                ? (children) => (
                    <DraggableTightListItemContainer
                      isDragging={isDragging}
                      key={item.id}
                      {...draggableProps}
                      {...dragHandleProps}
                    >
                      {children}
                    </DraggableTightListItemContainer>
                  )
                : undefined
            }
            key={item.id}
          >
            <CurrentHabitProvider value={item}>
              {activeItemId === item.id ? <EditHabitForm /> : <HabitItem />}
            </CurrentHabitProvider>
          </Wrap>
        )
      }}
    />
  )
}
