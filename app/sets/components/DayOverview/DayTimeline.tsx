import styled from 'styled-components'

import { TimelineMarks } from './TimelineMarks'
import { getHorizontalPaddingCSS } from '@increaser/ui/ui/utils/getHorizontalPaddingCSS'
import { WorkdayEndStatus } from './WorkdayEndStatus'
import { CurrentTime } from './CurrentTime'
import { WorkdayLeftBlock } from './WorkdayLeftBlock'
import { DayBlocks } from './DayBlocks'

const Wrapper = styled.div`
  flex: 1;
  ${getHorizontalPaddingCSS(0)};
  padding-bottom: 28px;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const DayTimeline = () => {
  return (
    <Wrapper>
      <Container>
        <WorkdayLeftBlock />
        <TimelineMarks />
        <DayBlocks />
        <CurrentTime />
        <WorkdayEndStatus />
      </Container>
    </Wrapper>
  )
}
