import { getColor } from '@lib/ui/theme/getters'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { toPercents } from '@lib/utils/toPercents'
import { useUser } from '@product/ui/user/state/user'
import styled from 'styled-components'

import { useDayOverview } from './DayOverviewProvider'

const Container = styled.div`
  width: 100%;
  background: ${getColor('foreground')};
  position: absolute;
  left: 0;
`

export const WorkdayLeftBlock = () => {
  const [weekday] = useSelectedWeekday()
  const dayStartedAt = useStartOfWeekday(weekday)
  const { startHour, endHour, currentTime } = useDayOverview()
  const timelineStartsAt = dayStartedAt + convertDuration(startHour, 'h', 'ms')
  const timelineEndsAt = dayStartedAt + convertDuration(endHour, 'h', 'ms')
  const { finishWorkAt } = useUser()

  const workdayEndsAt =
    dayStartedAt + convertDuration(finishWorkAt, 'min', 'ms')

  const workEndsIn = workdayEndsAt - currentTime
  const timespan = timelineEndsAt - timelineStartsAt

  if (currentTime > workdayEndsAt) {
    return null
  }

  return (
    <Container
      style={{
        top: toPercents((currentTime - timelineStartsAt) / timespan),
        height: toPercents(workEndsIn / timespan),
      }}
    />
  )
}
