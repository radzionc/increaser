import { AmountOverview } from './AmountOverview'
import { DayTimeline } from './DayTimeline'
import { AddSetPrompt } from './AddSetPrompt'
import { useActiveSet } from './ActiveSetProvider'
import { WeekNavigation } from './WeekNavigation'
import { DayOverviewContainer } from './DayOverviewContainer'
import { SetEditorForm } from './editor/SetEditorForm'

export const DayOverviewConent = () => {
  const [activeSet] = useActiveSet()

  if (activeSet) {
    return <SetEditorForm />
  }

  return (
    <DayOverviewContainer>
      <WeekNavigation />
      <AmountOverview />
      <DayTimeline />
      <AddSetPrompt />
    </DayOverviewContainer>
  )
}
