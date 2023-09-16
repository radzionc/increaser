import { useMemo } from 'react'
import { useDayOverview } from './DayOverviewProvider'
import { PositionAbsolutelyCenterHorizontally } from '@increaser/ui/ui/PositionAbsolutelyCenterHorizontally'
import { toPercents } from '@increaser/utils/toPercents'
import styled from 'styled-components'
import { getHorizontalPaddingCSS } from '@increaser/ui/ui/utils/getHorizontalPaddingCSS'
import {
  horizontalPaddingInPx,
  timeLabelGapInPx,
  timeLabelWidthInPx,
} from './config'
import { Text } from '@increaser/ui/ui/Text'
import { formatTime } from '@increaser/utils/time/formatTime'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { getHoursInRange } from '@increaser/utils/time/getHoursInRange'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { takeWholeSpace } from '@increaser/ui/css/takeWholeSpace'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'

const Container = styled.div`
  display: grid;
  grid-template-columns: ${timeLabelWidthInPx}px 1fr;
  align-items: center;
  ${getHorizontalPaddingCSS(horizontalPaddingInPx)};
  gap: ${timeLabelGapInPx}px;
`

const Time = styled.div`
  ${centerContentCSS};
  ${takeWholeSpace};
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${getColor('mist')};
  ${defaultTransitionCSS};
`

export const TimelineMarks = () => {
  const { timelineStartsAt, timelineEndsAt } = useDayOverview()
  const marks = useMemo(() => {
    return getHoursInRange(timelineStartsAt, timelineEndsAt)
  }, [timelineEndsAt, timelineStartsAt])

  const timespan = timelineEndsAt - timelineStartsAt

  return (
    <>
      {marks.map((mark) => {
        return (
          <PositionAbsolutelyCenterHorizontally
            fullWidth
            top={toPercents((mark - timelineStartsAt) / timespan)}
            key={mark}
          >
            <Container>
              <Time>
                <Text color="shy" size={14}>
                  {formatTime(mark)}
                </Text>
              </Time>
              <Line />
            </Container>
          </PositionAbsolutelyCenterHorizontally>
        )
      })}
    </>
  )
}
