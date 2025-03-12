import { VStack } from '@lib/ui/css/stack'
import { HabitItem } from '@product/ui/habits/components/CuratedHabits/HabitItem'
import { habitRecord } from '@product/ui/habits/data/habits'
import styled from 'styled-components'

const Container = styled(VStack)`
  width: 100%;
  gap: 40px;
  max-width: 560px;
`

export const HabitIdeasPage = () => {
  return (
    <Container>
      {Object.entries(habitRecord).map(([id, habit]) => (
        <HabitItem value={{ ...habit, id }} key={id} />
      ))}
    </Container>
  )
}
