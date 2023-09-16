import styled from 'styled-components'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { AmountOverview } from './AmountOverview'
import { DayTimeline } from './DayTimeline'
import { AddSession } from './AddSession'
import { horizontalPaddingInPx } from './config'
import { WeekNavigation } from './WeekNavigation'
import { DayOverviewProvider } from './DayOverviewProvider'

const Container = styled(Panel)`
  height: 100%;
`

export const DayOverview = () => {
  return (
    <DayOverviewProvider>
      <Container padding={horizontalPaddingInPx} withSections kind="secondary">
        <WeekNavigation />
        <AmountOverview />
        <DayTimeline />
        <AddSession />
      </Container>
    </DayOverviewProvider>
  )
}
