import { habitRecord } from '@increaser/app/habits/data/habits'
import styled from 'styled-components'
import { VStack } from '@lib/ui/css/stack'

import { HabitItem } from './HabitItem'

const Container = styled(VStack)`
  width: 100%;
  gap: 40px;
  max-width: 560px;
`

export const CuratedHabits = () => {
  return (
    <Container>
      {Object.entries(habitRecord).map(([id, habit]) => (
        <HabitItem value={habit} key={id} />
      ))}
    </Container>
  )
}
