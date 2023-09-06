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

const Container = styled.div`
  display: grid;
  grid-template-columns: ${timeLabelWidthInPx}px 1fr;
  align-items: center;
  ${getHorizontalPaddingCSS(horizontalPaddingInPx)};
  gap: ${timeLabelGapInPx}px;
`

const Time = styled.div`
  ${centerContentCSS};
  width: 100%;
  height: 100%;
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${getColor('mist')};
`

export const TimelineMarks = () => {
  const { startsAt, endsAt } = useDayOverview()
  const marks = useMemo(() => {
    return getHoursInRange(startsAt, endsAt)
  }, [endsAt, startsAt])

  const timespan = endsAt - startsAt

  return (
    <>
      {marks.map((mark) => {
        return (
          <PositionAbsolutelyCenterHorizontally
            fullWidth
            top={toPercents((mark - startsAt) / timespan)}
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
