import { TrackedTimeReportProvider } from '@increaser/ui/timeTracking/report/TrackedTimeReportProvider'
import { TrackedTimeReport } from '@increaser/ui/timeTracking/report/TrackedTimeReport'
import { TrackedTimeProvider } from '@increaser/ui/timeTracking/report/TrackedTimeProvider'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TimeTrackingLayout } from '../../timeTracking/TimeTrackingLayout'

export default withLayout({
  page: () => (
    <TrackedTimeProvider>
      <TrackedTimeReportProvider>
        <TrackedTimeReport />
      </TrackedTimeReportProvider>
    </TrackedTimeProvider>
  ),
  layout: TimeTrackingLayout,
})
