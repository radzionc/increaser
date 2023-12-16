import { PositionAbsolutelyCenterHorizontally } from '@increaser/ui/layout/PositionAbsolutelyCenterHorizontally'
import { toPercents } from '@increaser/utils/toPercents'
import { useDayOverview } from './DayOverviewProvider'
import styled from 'styled-components'
import { getColor } from '@increaser/ui/theme/getters'
import { horizontalPaddingInPx } from './config'
import { formatTime } from '@increaser/utils/time/formatTime'
import { Text } from '@increaser/ui/text'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { centerContent } from '@increaser/ui/css/centerContent'
import { absoluteOutline } from '@increaser/ui/css/absoluteOutline'
import { useAssertUserState } from 'user/state/UserStateContext'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { dayTimeLabelTimeWidthInPx } from '../DayTimeLabels'

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${getColor('primary')};
`

const Wrapper = styled.div`
  width: ${dayTimeLabelTimeWidthInPx}px;
  margin-left: ${horizontalPaddingInPx}px;
  position: relative;
  ${centerContent}
  height: 20px;
`

const Time = styled(Text)`
  position: absolute;
`

const Outline = styled.div`
  ${absoluteOutline(10, 6)};
  background: ${getColor('background')};
  border-radius: 8px;
  border: 2px solid ${getColor('primary')};
`

export const CurrentTime = () => {
  const { goalToFinishWorkBy } = useAssertUserState()
  const { currentTime, startHour, endHour, dayStartedAt } = useDayOverview()

  const workdayEndsAt =
    dayStartedAt + convertDuration(goalToFinishWorkBy, 'min', 'ms')
  const timelineEndsAt = dayStartedAt + convertDuration(endHour, 'h', 'ms')
  const timelineStartsAt = dayStartedAt + convertDuration(startHour, 'h', 'ms')

  const todayStartedAt = useStartOfDay()
  if (dayStartedAt !== todayStartedAt) {
    return null
  }

  if (currentTime > workdayEndsAt && timelineEndsAt === workdayEndsAt) {
    return null
  }

  const timespan = timelineEndsAt - timelineStartsAt

  const top = toPercents((currentTime - timelineStartsAt) / timespan)

  return (
    <>
      <PositionAbsolutelyCenterHorizontally fullWidth top={top}>
        <Line />
      </PositionAbsolutelyCenterHorizontally>
      <PositionAbsolutelyCenterHorizontally fullWidth top={top}>
        <Wrapper>
          <Outline />
          <Time size={14} weight="bold">
            {formatTime(currentTime)}
          </Time>
        </Wrapper>
      </PositionAbsolutelyCenterHorizontally>
    </>
  )
}
