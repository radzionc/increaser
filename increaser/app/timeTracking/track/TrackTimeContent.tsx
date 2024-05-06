import { useTrackTime } from './TrackTimeProvider'
import { DayOverview } from './DayOverview'
import { Panel, panelDefaultPadding } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { EditIntervalView } from './EditIntervalView'
import styled from 'styled-components'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { TrackTimeFooter } from './TrackTimeFooter'
import { TrackTimeHeader } from './TrackTimeHeader'

const Container = styled(VStack)`
  max-width: 440px;
  gap: 16px;
  flex: 1;
`

const Content = styled(Panel)`
  flex: 1;
`

const InternalContentWr = styled.div`
  flex: 1;
  position: relative;
`

const InternalContent = styled(TakeWholeSpaceAbsolutely)`
  overflow-y: auto;
  padding: ${toSizeUnit(panelDefaultPadding)};
`

export const TrackTimeContent = () => {
  const { currentSet } = useTrackTime()

  return (
    <Container>
      <TrackTimeHeader />
      <Content kind="secondary" withSections>
        <InternalContentWr>
          <InternalContent>
            {currentSet ? <EditIntervalView /> : <DayOverview />}
          </InternalContent>
        </InternalContentWr>
        <TrackTimeFooter />
      </Content>
    </Container>
  )
}
