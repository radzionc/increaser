import { useDayOverview } from './DayOverviewProvider'
import styled from 'styled-components'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { DayTimeLabels } from '../DayTimeLabels'
import { HoursLines } from './HourLines'
import { dayOverviewConfig } from './config'

const Wrapper = styled.div`
  ${horizontalPadding(dayOverviewConfig.horizontalPadding)};
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
