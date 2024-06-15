import { HStack } from '@lib/ui/layout/Stack'
import { useTrackHabits } from './state/TrackHabitsContext'
import { HabitsColumn } from './HabitsColumn'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { trackHabitsConfig } from './config'

const Container = styled(HStack)`
  gap: ${toSizeUnit(trackHabitsConfig.itemGap)};
`

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
