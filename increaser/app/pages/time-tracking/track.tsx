import { makeTimeTrackingPage } from '../../timeTracking/makeTimeTrackingPage'
import { TrackTime } from '../../timeTracking/track/TrackTime'
import { TrackTimeProvider } from '../../timeTracking/track/TrackTimeProvider'

export default makeTimeTrackingPage(() => (
  <TrackTimeProvider>
    <TrackTime />
  </TrackTimeProvider>
))
