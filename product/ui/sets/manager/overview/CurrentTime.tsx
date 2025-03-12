import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { getColor } from '@lib/ui/theme/getters'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatTime } from '@lib/utils/time/formatTime'
import { toPercents } from '@lib/utils/toPercents'
import styled from 'styled-components'

import { useWorkDayEndsAt } from '../../../schedule/hooks/useWorkDayEndsAt'

import { dayOverviewConfig } from './config'
import { useDayOverview } from './DayOverviewProvider'

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${getColor('primary')};
`

const Wrapper = styled.div`
  margin-left: ${toSizeUnit(dayOverviewConfig.horizontalPadding - 10)};
  width: 52px;
  position: relative;
  ${centerContent}
  height: 28px;
  background: ${getColor('background')};
  ${borderRadius.s};
  border: 2px solid ${getColor('primary')};
  ${centerContent};
  font-weight: 600;
  font-size: 13px;
  color: ${getColor('contrast')};
`

export const CurrentTime = () => {
  const [weekday] = useSelectedWeekday()
  const dayStartedAt = useStartOfWeekday(weekday)
  const { currentTime, startHour, endHour } = useDayOverview()

  const workdayEndsAt = useWorkDayEndsAt()
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
        <Wrapper>{formatTime(currentTime)}</Wrapper>
      </PositionAbsolutelyCenterHorizontally>
    </>
  )
}
