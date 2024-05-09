import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { TrackTimeFooter } from './TrackTimeFooter'
import { TrackTimeHeader } from './TrackTimeHeader'
import { TrackTimeContent } from './TrackTimeContent'

const Container = styled(VStack)`
  max-width: 440px;
  gap: 16px;
  flex: 1;
`

export const TrackTime = () => (
  <Container>
    <TrackTimeHeader />
    <Panel style={{ flex: 1 }} kind="secondary" withSections>
      <TrackTimeContent />
      <TrackTimeFooter />
    </Panel>
  </Container>
)
