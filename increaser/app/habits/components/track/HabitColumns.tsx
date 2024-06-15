import { HStack } from '@lib/ui/layout/Stack'
import { useTrackHabits } from './state/TrackHabitsContext'
import { HabitsColumn } from './HabitsColumn'
import styled from 'styled-components'

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
