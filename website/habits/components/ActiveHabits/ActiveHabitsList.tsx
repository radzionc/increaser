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

  return (
    <Container>
      {habits.map((habit) => (
        <CurrentHabitProvider value={habit} key={habit.id}>
          <ActiveHabit />
        </CurrentHabitProvider>
      ))}
    </Container>
  )
}
