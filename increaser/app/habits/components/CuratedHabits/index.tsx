import { habitRecord } from '@increaser/app/habits/data/habits'
import styled from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'

import { HabitItem } from './HabitItem'

const Container = styled(HStack)`
  width: 100%;
  flex-wrap: wrap;
  gap: 40px;
  align-items: start;
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
