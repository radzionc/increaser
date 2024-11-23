import { FocusSoundsPlayer } from '@increaser/ui/focus/audio/sounds/FocusSoundsPlayer'
import { YouTubeFocusMusicFloatingPlayer } from '@increaser/ui/focus/audio/youTube/YouTubeFocusMusicFloatingPlayer'
import { FocusTaskObserver } from '@increaser/ui/focus/components/FocusTaskObserver'
import { FocusNotifications } from '@increaser/ui/focus/notifications/FocusNotifications'
import { PausedFocusAutoStop } from './PausedFocusAutoStop'
import { FocusAutoStop } from './FocusAutoStop'
import { LastSetObserver } from './autoStop/LastSetObserver'
import { FocusDurationManager } from './FocusDurationManager'
import { useFocusStatus } from '@increaser/ui/focus/state/focusIntervals'
import { Match } from '@lib/ui/base/Match'
import { MatchPresense } from '@lib/ui/base/MatchPresense'
import { ErrorBoundary } from '../errors/components/ErrorBoundary'

export const FocusManager = () => {
  const status = useFocusStatus()

  return (
    <ErrorBoundary>
      <LastSetObserver />
      <MatchPresense
        value={status}
        absent={() => <FocusDurationManager />}
        present={(value) => (
          <>
            <FocusTaskObserver />
            <Match
              value={value}
              active={() => (
                <>
                  <FocusSoundsPlayer />
                  <YouTubeFocusMusicFloatingPlayer />
                  <FocusNotifications />
                  <FocusAutoStop />
                </>
              )}
              paused={() => <PausedFocusAutoStop />}
            />
          </>
        )}
      />
    </ErrorBoundary>
  )
}
