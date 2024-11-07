import { TrackedTimeReport } from '@increaser/ui/projects/trackedTimeReport/TrackedTimeReport'
import { TimesheetPageTimeGroupingProvider } from './TimesheetPageTimeGroupingProvider'
import { PageHeaderControlsArea } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { HideProjectNamesSelector } from '@increaser/ui/projects/trackedTimeReport/hideProjectNames/HideProjectNamesSelector'

export const TimesheetPageContent = () => (
  <>
    <PageHeaderControlsArea>
      <HideProjectNamesSelector />
    </PageHeaderControlsArea>
    <TimesheetPageTimeGroupingProvider>
      <TrackedTimeReport />
    </TimesheetPageTimeGroupingProvider>
  </>
)
