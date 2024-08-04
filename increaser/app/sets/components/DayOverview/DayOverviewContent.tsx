import { AmountOverview } from './AmountOverview'
import { DayTimeline } from './DayTimeline'
import { AddSetPrompt } from './AddSetPrompt'
import { useActiveSet } from './ActiveSetProvider'
import { WeekNavigation } from './WeekNavigation'
import { SetEditorHeader } from './editor/SetEditorHeader'
import { SetEdtitorFooter } from './editor/SetEditorFooter'
import { SetEditorProject } from './editor/SetEditorProject'
import { SetEditorContent } from './editor/SetEditorContent'

export const DayOverviewConent = () => {
  const [activeSet] = useActiveSet()

  if (activeSet) {
    return (
      <>
        <SetEditorHeader />
        <SetEditorProject />
        <SetEditorContent />
        <SetEdtitorFooter />
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
