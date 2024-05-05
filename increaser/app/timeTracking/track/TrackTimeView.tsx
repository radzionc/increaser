import { TrackTimeProvider } from './TrackTimeProvider'
import { TrackTimeContent } from './TrackTimeContent'

export const TrackTimeView = () => {
  return (
    <TrackTimeProvider>
      <TrackTimeContent />
    </TrackTimeProvider>
  )
}
