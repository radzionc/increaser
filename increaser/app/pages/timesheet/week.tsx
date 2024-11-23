import { withLayout } from '@lib/next-ui/utils/withLayout'
import { RegularAppPageLayout } from '../../ui/page/RegularAppPageLayout'
import { TimesheetPageContent } from '../../timesheet/TimesheetPageContent'

export default withLayout({
  page: TimesheetPageContent,
  layout: RegularAppPageLayout,
})
