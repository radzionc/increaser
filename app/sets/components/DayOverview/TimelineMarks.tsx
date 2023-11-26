import { useMemo } from 'react'
import { useDayOverview } from './DayOverviewProvider'
import { PositionAbsolutelyCenterHorizontally } from '@increaser/ui/layout/PositionAbsolutelyCenterHorizontally'
import { toPercents } from '@increaser/utils/toPercents'
import styled from 'styled-components'
import {
  horizontalPaddingInPx,
  timeLabelGapInPx,
  timeLabelWidthInPx,
} from './config'
import { Text } from '@increaser/ui/text'
import { formatTime } from '@increaser/utils/time/formatTime'
import { getColor } from '@increaser/ui/theme/getters'
import { getHoursInRange } from '@increaser/utils/time/getHoursInRange'
import { takeWholeSpace } from '@increaser/ui/css/takeWholeSpace'
import { horizontalPadding } from '@increaser/ui/css/horizontalPadding'
import { centerContent } from '@increaser/ui/css/centerContent'
import { transition } from '@increaser/ui/css/transition'

const Container = styled.div`
  display: grid;
  grid-template-columns: ${timeLabelWidthInPx}px 1fr;
  align-items: center;
  ${horizontalPadding(horizontalPaddingInPx)};
  gap: ${timeLabelGapInPx}px;
`

const Time = styled.div`
  ${centerContent};
  ${takeWholeSpace};
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${getColor('mist')};
  ${transition};
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
