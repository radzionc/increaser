import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { toPercents } from '@lib/utils/toPercents'
import { useDayOverview } from './DayOverviewProvider'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { formatTime } from '@lib/utils/time/formatTime'
import { Text } from '@lib/ui/text'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { centerContent } from '@lib/ui/css/centerContent'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { dayTimeLabelTimeWidthInPx } from '../DayTimeLabels'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { dayOverviewConfig } from './config'

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${getColor('primary')};
`

const Wrapper = styled.div`
  width: ${dayTimeLabelTimeWidthInPx}px;
  margin-left: ${toSizeUnit(dayOverviewConfig.horizontalPadding)};
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
  const { finishWorkAt } = useAssertUserState()
  const [weekday] = useSelectedWeekday()
  const dayStartedAt = useStartOfWeekday(weekday)
  const { currentTime, startHour, endHour } = useDayOverview()

  const workdayEndsAt =
    dayStartedAt + convertDuration(finishWorkAt, 'min', 'ms')
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
