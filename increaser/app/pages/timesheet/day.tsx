import { withLayout } from '@lib/next-ui/utils/withLayout'
import { RegularAppPageLayout } from '../../ui/page/RegularAppPageLayout'
import { DaysTimesheetPageContent } from '../../timesheet/DaysTimesheetPageContent'

export default withLayout({
  page: DaysTimesheetPageContent,
  layout: RegularAppPageLayout,
})
