import { AmountOverview } from './AmountOverview'
import { DayTimeline } from './DayTimeline'
import { AddSetPrompt } from './AddSetPrompt'
import { useActiveSet } from './ActiveSetProvider'
import { WeekNavigation } from './WeekNavigation'
import { SetEditorHeader } from './editor/SetEditorHeader'

export const DayOverviewConent = () => {
  const [activeSet] = useActiveSet()

  if (activeSet) {
    return (
      <>
        <SetEditorHeader />
      </>
    )
  }

  return (
    <>
      <WeekNavigation />
      <AmountOverview />
      <DayTimeline />
      <AddSetPrompt />
    </>
  )
}
