import { Match } from '@lib/ui/base/Match'
import { MatchPresense } from '@lib/ui/base/MatchPresense'
import { FocusSoundsPlayer } from '@product/ui/focus/audio/sounds/FocusSoundsPlayer'
import { YouTubeFocusMusicFloatingPlayer } from '@product/ui/focus/audio/youTube/YouTubeFocusMusicFloatingPlayer'
import { FocusTaskObserver } from '@product/ui/focus/components/FocusTaskObserver'
import { FocusNotifications } from '@product/ui/focus/notifications/FocusNotifications'
import { useFocusStatus } from '@product/ui/focus/state/focusIntervals'

import { ErrorBoundary } from '../errors/components/ErrorBoundary'

import { LastSetObserver } from './autoStop/LastSetObserver'
import { FocusAutoStop } from './FocusAutoStop'
import { FocusDurationManager } from './FocusDurationManager'
import { PausedFocusAutoStop } from './PausedFocusAutoStop'

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
