import { HStack } from '@lib/ui/css/stack'
import styled from 'styled-components'

import { HabitsColumn } from './HabitsColumn'
import { useTrackHabits } from './state/TrackHabitsContext'

const Container = styled(HStack)``

export const HabitColumns = () => {
  const { days } = useTrackHabits()

  return (
    <Container>
      {days.map((day) => (
        <HabitsColumn key={day.startedAt} value={day} />
      ))}
    </Container>
  )
}
