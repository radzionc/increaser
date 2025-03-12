import { HideProjectNamesSelector } from '@product/ui/projects/trackedTimeReport/hideProjectNames/HideProjectNamesSelector'
import { TrackedTimeReport } from '@product/ui/projects/trackedTimeReport/TrackedTimeReport'

import { PageHeaderControlsArea } from '../ui/page/header/PageHeaderControlsAreaProvider'

import { TimesheetPageTimeGroupingProvider } from './TimesheetPageTimeGroupingProvider'

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
