import { makeTimeTrackingPage } from '../../timeTracking/makeTimeTrackingPage'
import { TrackedTimeReportProvider } from '@increaser/ui/timeTracking/report/TrackedTimeReportProvider'
import { TrackedTimeReport } from '@increaser/ui/timeTracking/report/TrackedTimeReport'
import { TrackedTimeProvider } from '@increaser/ui/timeTracking/report/TrackedTimeProvider'

export default makeTimeTrackingPage(() => (
  <TrackedTimeProvider>
    <TrackedTimeReportProvider>
      <TrackedTimeReport />
    </TrackedTimeReportProvider>
  </TrackedTimeProvider>
))
