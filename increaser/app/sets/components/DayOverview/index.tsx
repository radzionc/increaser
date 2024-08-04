import styled from 'styled-components'
import { Panel } from '@lib/ui/panel/Panel'
import { AmountOverview } from './AmountOverview'
import { DayTimeline } from './DayTimeline'
import { horizontalPaddingInPx } from './config'
import { WeekNavigation } from './WeekNavigation'
import { DayOverviewProvider } from './DayOverviewProvider'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { SelectedWeekdayProvider } from '@lib/ui/time/SelectedWeekdayProvider'

const Container = styled(Panel)`
  height: 100%;
  background: transparent;
`

export const DayOverview = () => {
  const weekday = useWeekday()
  return (
    <SelectedWeekdayProvider initialValue={weekday}>
      <DayOverviewProvider>
        <Container
          padding={horizontalPaddingInPx}
          withSections
          kind="secondary"
        >
          <WeekNavigation />
          <AmountOverview />
          <DayTimeline />
        </Container>
      </DayOverviewProvider>
    </SelectedWeekdayProvider>
  )
}
