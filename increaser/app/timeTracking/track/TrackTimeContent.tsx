import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import styled from 'styled-components'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useTrackTime } from './state/TrackTimeContext'
import { TimeSpace } from '@lib/ui/timeline/TimeSpace'
import { msToPx } from './config'
import { Sessions } from './Sessions'
import { ScrollIntoViewOnFirstAppearance } from '@lib/ui/base/ScrollIntoViewOnFirstAppearance'
import { SetEditor } from './SetEditor'

const Wrapper = styled.div`
  flex: 1;
  position: relative;
`
const DefaultScrollPosition = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`

const Container = styled(TakeWholeSpaceAbsolutely)`
  overflow-y: auto;
  padding: ${toSizeUnit(panelDefaultPadding)};
`

export const TrackTimeContent = () => {
  const { currentSet, dayInterval } = useTrackTime()

  return (
    <Wrapper>
      <Container>
        <TimeSpace
          msToPx={msToPx}
          startsAt={dayInterval.start}
          endsAt={dayInterval.end}
        >
          <Sessions />
          {currentSet && <SetEditor />}
          <ScrollIntoViewOnFirstAppearance<HTMLDivElement>
            render={(props) => <DefaultScrollPosition {...props} />}
          />
        </TimeSpace>
      </Container>
    </Wrapper>
  )
}
