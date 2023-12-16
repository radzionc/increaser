import styled from 'styled-components'
import { useDayOverview } from './DayOverviewProvider'
import { getColor } from '@increaser/ui/theme/getters'
import { toPercents } from '@increaser/utils/toPercents'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { useAssertUserState } from 'user/state/UserStateContext'

const Container = styled.div`
  width: 100%;
  background: ${getColor('foreground')};
  position: absolute;
  left: 0;
`

export const WorkdayLeftBlock = () => {
  const { goalToFinishWorkBy } = useAssertUserState()
  const { startHour, endHour, currentTime, dayStartedAt } = useDayOverview()
  const timelineStartsAt = dayStartedAt + convertDuration(startHour, 'h', 'ms')
  const timelineEndsAt = dayStartedAt + convertDuration(endHour, 'h', 'ms')
  const workdayEndsAt =
    dayStartedAt + convertDuration(goalToFinishWorkBy, 'min', 'ms')

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
