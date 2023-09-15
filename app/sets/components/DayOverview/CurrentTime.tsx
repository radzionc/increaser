import { PositionAbsolutelyCenterHorizontally } from '@increaser/ui/ui/PositionAbsolutelyCenterHorizontally'
import { toPercents } from '@increaser/utils/toPercents'
import { useDayOverview } from './DayOverviewProvider'
import styled from 'styled-components'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { horizontalPaddingInPx, timeLabelWidthInPx } from './config'
import { formatTime } from '@increaser/utils/time/formatTime'
import { Text } from '@increaser/ui/ui/Text'
import { getOutlineCSS } from '@increaser/ui/ui/utils/getOutlineCSS'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'

const Line = styled.div`
  width: 100%;
  height: 2px;
  background: ${getColor('primary')};
`

const Wrapper = styled.div`
  width: ${timeLabelWidthInPx}px;
  margin-left: ${horizontalPaddingInPx}px;
  position: relative;
  ${centerContentCSS}
  height: 20px;
`

const Time = styled(Text)`
  position: absolute;
`

const Outline = styled.div`
  ${getOutlineCSS(6, 6)};
  background: ${getColor('background')};
  border-radius: 8px;
  border: 2px solid ${getColor('primary')};
`

export const CurrentTime = () => {
  const {
    currentTime,
    timelineStartsAt,
    timelineEndsAt,
    workdayEndsAt,
    dayStartedAt,
  } = useDayOverview()

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
