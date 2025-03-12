import { AddSetPrompt } from './AddSetPrompt'
import { AmountOverview } from './AmountOverview'
import { DayOverviewProvider } from './DayOverviewProvider'
import { DayTimeline } from './DayTimeline'
import { WeekNavigation } from './navigation'

export const SetsOverview = () => {
  return (
    <DayOverviewProvider>
      <WeekNavigation />
      <AmountOverview />
      <DayTimeline />
      <AddSetPrompt />
    </DayOverviewProvider>
  )
}
