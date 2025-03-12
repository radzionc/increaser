import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import styled from 'styled-components'

import { Blocks } from './Blocks'
import { dayOverviewConfig } from './config'
import { CurrentTime } from './CurrentTime'
import { useDayOverview } from './DayOverviewProvider'
import { Sets } from './Sets'
import { TimelineMarks } from './TimelineMarks'
import { WorkdayEndStatus } from './WorkdayEndStatus'
import { WorkdayLeftBlock } from './WorkdayLeftBlock'

const Wrapper = styled.div`
  flex: 1;
  padding: 0;
  position: relative;
  min-height: 320px;
`

const Container = styled.div`
  ${takeWholeSpaceAbsolutely}
  overflow: auto;
  ${verticalPadding(dayOverviewConfig.verticalPlaceholderHeight)};
`

const Content = styled.div`
  ${takeWholeSpace};
  position: relative;
`

export const DayTimeline = () => {
  const { startHour, endHour } = useDayOverview()
  const minHeight = (endHour - startHour) * dayOverviewConfig.minimumHourHeight

  return (
    <Wrapper>
      <Container>
        <Content style={{ minHeight }}>
          <WorkdayLeftBlock />
          <TimelineMarks />
          <CurrentTime />
          <WorkdayEndStatus />
          <Sets />
          <Blocks />
        </Content>
      </Container>
    </Wrapper>
  )
}
