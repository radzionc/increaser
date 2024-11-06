import { TrackedTimeReport } from '@increaser/ui/projects/trackedTimeReport/TrackedTimeReport'
import { TimesheetPageTimeGroupingProvider } from './TimesheetPageTimeGroupingProvider'

export const TimesheetPageContent = () => (
  <TimesheetPageTimeGroupingProvider>
    <TrackedTimeReport />
  </TimesheetPageTimeGroupingProvider>
)
