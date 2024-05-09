import styled from 'styled-components'
import { Panel } from '@lib/ui/panel/Panel'
import { AmountOverview } from './AmountOverview'
import { DayTimeline } from './DayTimeline'
import { horizontalPaddingInPx } from './config'
import { WeekNavigation } from './WeekNavigation'
import { DayOverviewProvider } from './DayOverviewProvider'

const Container = styled(Panel)`
  height: 100%;
  background: transparent;
`

export const DayOverview = () => {
  return (
    <DayOverviewProvider>
      <Container padding={horizontalPaddingInPx} withSections kind="secondary">
        <WeekNavigation />
        <AmountOverview />
        <DayTimeline />
      </Container>
    </DayOverviewProvider>
  )
}
