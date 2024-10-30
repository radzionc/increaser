import { FocusSoundsPlayer } from '@increaser/app/focus/audio/sounds/FocusSoundsPlayer'
import { YouTubeFocusMusicFloatingPlayer } from '@increaser/app/focus/audio/youTube/YouTubeFocusMusicFloatingPlayer'
import { FocusTaskObserver } from '@increaser/app/focus/components/FocusTaskObserver'
import { FocusNotifications } from '@increaser/app/focus/notifications/FocusNotifications'
import { PausedFocusAutoStop } from './PausedFocusAutoStop'
import { FocusAutoStop } from './FocusAutoStop'
import { LastSetObserver } from './autoStop/LastSetObserver'
import { FocusDurationManager } from './FocusDurationManager'
import { useFocusStatus } from '@increaser/app/focus/state/focusIntervals'
import { Match } from '@lib/ui/base/Match'
import { MatchPresense } from '@lib/ui/base/MatchPresense'

export const FocusManager = () => {
  const status = useFocusStatus()

  return (
    <>
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
    </>
  )
}
