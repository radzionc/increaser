import { withLayout } from '@lib/next-ui/utils/withLayout'
import { TrackTime } from '../../timeTracking/track/TrackTime'
import { TrackTimeProvider } from '../../timeTracking/track/TrackTimeProvider'
import { TimeTrackingLayout } from '../../timeTracking/TimeTrackingLayout'

export default withLayout({
  page: () => (
    <TrackTimeProvider>
      <TrackTime />
    </TrackTimeProvider>
  ),
  layout: TimeTrackingLayout,
})
