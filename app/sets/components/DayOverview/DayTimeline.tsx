import styled from 'styled-components'

import { TimelineMarks } from './TimelineMarks'
import { WorkdayEndStatus } from './WorkdayEndStatus'
import { CurrentTime } from './CurrentTime'
import { WorkdayLeftBlock } from './WorkdayLeftBlock'
import { WorkBlocks } from './WorkBlocks'
import { ManageLastSession } from './ManageLastSession'
import {
  botomPlaceholderHeightInPx,
  minimumHourHeightInPx,
  topPlaceholderHeightInPx,
} from './config'
import { useDayOverview } from './DayOverviewProvider'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { takeWholeSpaceAbsolutely } from '@increaser/ui/css/takeWholeSpaceAbsolutely'
import { takeWholeSpace } from '@increaser/ui/css/takeWholeSpace'

const Wrapper = styled.div`
  flex: 1;
  padding: 0;
  position: relative;
  min-height: 320px;
`

const Container = styled.div`
  ${takeWholeSpaceAbsolutely}
  overflow: auto;
  padding-bottom: ${botomPlaceholderHeightInPx}px;
  padding-top: ${topPlaceholderHeightInPx}px;
`

const Content = styled.div`
  ${takeWholeSpace};
  position: relative;
`

export const DayTimeline = () => {
  const { timelineStartsAt, timelineEndsAt } = useDayOverview()
  const timespan = timelineEndsAt - timelineStartsAt
  const minHeight = convertDuration(timespan, 'ms', 'h') * minimumHourHeightInPx

  return (
    <Wrapper>
      <Container>
        <Content style={{ minHeight }}>
          <WorkdayLeftBlock />
          <TimelineMarks />
          <CurrentTime />
          <WorkdayEndStatus />
          <WorkBlocks />
          <ManageLastSession />
        </Content>
      </Container>
    </Wrapper>
  )
}
