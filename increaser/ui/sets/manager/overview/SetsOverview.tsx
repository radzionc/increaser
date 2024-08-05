import styled from 'styled-components'
import { Panel } from '@lib/ui/panel/Panel'
import { DayOverviewProvider } from './DayOverviewProvider'
import { AddSetPrompt } from './AddSetPrompt'
import { AmountOverview } from './AmountOverview'
import { dayOverviewConfig } from './config'
import { DayTimeline } from './DayTimeline'
import { WeekNavigation } from './navigation'

const Container = styled(Panel)`
  height: 100%;
`

export const SetsOverview = () => {
  return (
    <DayOverviewProvider>
      <Container
        padding={dayOverviewConfig.horizontalPadding}
        withSections
        kind="secondary"
      >
        <WeekNavigation />
        <AmountOverview />
        <DayTimeline />
        <AddSetPrompt />
      </Container>
    </DayOverviewProvider>
  )
}
