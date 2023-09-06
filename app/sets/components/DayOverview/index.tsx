import styled from 'styled-components'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { useFocus } from 'focus/hooks/useFocus'
import { CreateSet } from '../CreateSet'
import { DayOverviewProvider } from './DayOverviewProvider'
import { AmountOverview } from './AmountOverview'
import { DayTimeline } from './DayTimeline'

const Container = styled(Panel)`
  height: 100%;
  min-height: 720px;
`

export const DayOverview = () => {
  const { currentSet } = useFocus()

  return (
    <DayOverviewProvider>
      <Container withSections kind="secondary">
        <AmountOverview />
        <DayTimeline />
        {!currentSet && <CreateSet />}
      </Container>
    </DayOverviewProvider>
  )
}
