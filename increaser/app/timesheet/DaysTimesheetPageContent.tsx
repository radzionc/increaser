import { TrackedTimeReport } from '@increaser/ui/projects/trackedTimeReport/TrackedTimeReport'
import { TimesheetPageTimeGroupingProvider } from './TimesheetPageTimeGroupingProvider'
import { PageHeaderControlsArea } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { HideProjectNamesSelector } from '@increaser/ui/projects/trackedTimeReport/hideProjectNames/HideProjectNamesSelector'
import { DaysViewSelector } from '@increaser/ui/projects/trackedTimeReport/days/DaysViewSelector'

export const DaysTimesheetPageContent = () => (
  <>
    <PageHeaderControlsArea>
      <DaysViewSelector />
      <HideProjectNamesSelector />
    </PageHeaderControlsArea>
    <TimesheetPageTimeGroupingProvider>
      <TrackedTimeReport />
    </TimesheetPageTimeGroupingProvider>
  </>
)
