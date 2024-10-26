import { habitRecord } from '@increaser/ui/habits/data/habits'
import styled from 'styled-components'
import { VStack } from '@lib/ui/css/stack'

import { HabitItem } from '@increaser/ui/habits/components/CuratedHabits/HabitItem'

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
