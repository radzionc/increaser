import styled from 'styled-components'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { AmountOverview } from './AmountOverview'
import { DayTimeline } from './DayTimeline'
import { AddSession } from './AddSession'
import { horizontalPaddingInPx } from './config'
import { WeekNavigation } from './WeekNavigation'

const Container = styled(Panel)`
  height: 100%;
`

export const DayOverview = () => {
  return (
    <Container padding={horizontalPaddingInPx} withSections kind="secondary">
      <WeekNavigation />
      <AmountOverview />
      <DayTimeline />
      <AddSession />
    </Container>
  )
}
