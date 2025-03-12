import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import styled from 'styled-components'

import { dayOverviewConfig } from './config'
import { useDayOverview } from './DayOverviewProvider'
import { DayTimeLabels } from './DayTimeLabels'
import { HoursLines } from './HourLines'

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
