import { withLayout } from '@lib/next-ui/utils/withLayout'
import { RegularAppPageLayout } from '../../focus/components/RegularAppPageLayout'
import { TimesheetPageContent } from '../../timesheet/TimesheetPageContent'

export default withLayout({
  page: TimesheetPageContent,
  layout: RegularAppPageLayout,
})
