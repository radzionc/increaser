import { useUpdateHabitMutation } from 'habits/api/useUpdateHabitMutation'
import { useCallback } from 'react'
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd'
import { getNewOrder } from '@increaser/utils/getNewOrder'
import styled from 'styled-components'

import { CurrentHabitProvider } from '../CurrentHabitProvider'
import { useHabits } from '../HabitsProvider'
import { ActiveHabit } from './ActiveHabit'

const Container = styled.div`
  > * {
    margin-top: 16px;
  }
`

export const ActiveHabitsList = () => {
  const { habits } = useHabits()

  const { mutate: updateHabit } = useUpdateHabitMutation()
  const handleDragEnd: OnDragEndResponder = useCallback(
    ({ destination, source, draggableId }) => {
      if (!destination) {
        return
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return
      }

      const order = getNewOrder(
        habits.map(({ order }) => order),
        source.index,
        destination.index,
      )

      updateHabit({
        id: draggableId,
        fields: {
          order,
        },
      })
    },
    [habits, updateHabit],
  )

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="habits">
        {(provided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {habits.map((habit) => (
              <CurrentHabitProvider value={habit} key={habit.id}>
                <ActiveHabit />
              </CurrentHabitProvider>
            ))}
            <>{provided.placeholder}</>
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}
