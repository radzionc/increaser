import { withLayout } from '@lib/next-ui/utils/withLayout'
import { RegularAppPageLayout } from '../../focus/components/RegularAppPageLayout'
import { DaysTimesheetPageContent } from '../../timesheet/DaysTimesheetPageContent'

export default withLayout({
  page: DaysTimesheetPageContent,
  layout: RegularAppPageLayout,
})
