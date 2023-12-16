import { useDayOverview } from './DayOverviewProvider'
import styled from 'styled-components'
import { horizontalPaddingInPx } from './config'
import { horizontalPadding } from '@increaser/ui/css/horizontalPadding'
import { DayTimeLabels } from '../DayTimeLabels'
import { HoursLines } from './HourLines'

const Wrapper = styled.div`
  ${horizontalPadding(horizontalPaddingInPx)};
  height: 100%;
`

export const TimelineMarks = () => {
  const { startHour, endHour } = useDayOverview()

  return (
    <Wrapper>
      <DayTimeLabels startHour={startHour} endHour={endHour} />
      <HoursLines />
    </Wrapper>
  )
}
