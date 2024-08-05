import styled from 'styled-components'

import { TimelineMarks } from './TimelineMarks'
import { WorkdayEndStatus } from './WorkdayEndStatus'
import { CurrentTime } from './CurrentTime'
import { WorkdayLeftBlock } from './WorkdayLeftBlock'
import { WorkBlocks } from './blocks'
import { useDayOverview } from './DayOverviewProvider'
import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { dayOverviewConfig } from './config'
import { verticalPadding } from '@lib/ui/css/verticalPadding'

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
          <WorkBlocks />
        </Content>
      </Container>
    </Wrapper>
  )
}
