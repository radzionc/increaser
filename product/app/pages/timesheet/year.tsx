import { withLayout } from '@lib/next-ui/utils/withLayout'

import { TimesheetPageContent } from '../../timesheet/TimesheetPageContent'
import { RegularAppPageLayout } from '../../ui/page/RegularAppPageLayout'

export default withLayout({
  page: TimesheetPageContent,
  layout: RegularAppPageLayout,
})
