import styled from 'styled-components'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { AmountOverview } from './AmountOverview'
import { DayTimeline } from './DayTimeline'
import { AddSession } from './AddSession'

const Container = styled(Panel)`
  height: 100%;
  min-height: 720px;
`

export const DayOverview = () => {
  return (
    <Container withSections kind="secondary">
      <AmountOverview />
      <DayTimeline />
      <AddSession />
    </Container>
  )
}
