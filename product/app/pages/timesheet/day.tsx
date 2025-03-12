import { withLayout } from '@lib/next-ui/utils/withLayout'

import { DaysTimesheetPageContent } from '../../timesheet/DaysTimesheetPageContent'
import { RegularAppPageLayout } from '../../ui/page/RegularAppPageLayout'

export default withLayout({
  page: DaysTimesheetPageContent,
  layout: RegularAppPageLayout,
})
