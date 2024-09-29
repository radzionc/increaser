import { FocusSoundsPlayer } from '@increaser/app/focus/audio/sounds/FocusSoundsPlayer'
import { YouTubeFocusMusicFloatingPlayer } from '@increaser/app/focus/audio/youTube/YouTubeFocusMusicFloatingPlayer'
import { ActiveFocusOnly } from '@increaser/app/focus/components/ActiveFocusOnly'
import { FocusOnly } from '@increaser/app/focus/components/FocusOnly'
import { FocusTaskObserver } from '@increaser/app/focus/components/FocusTaskObserver'
import { PausedFocusOnly } from '@increaser/app/focus/components/PausedFocusOnly'
import { FocusNotifications } from '@increaser/app/focus/notifications/FocusNotifications'
import { MidnightFocusAutoStop } from './MidnightFocusAutoStop'
import { PausedFocusAutoStop } from './PausedFocusAutoStop'
import { LongFocusAutoStop } from './LongFocusAutoStop'

export const FocusManager = () => (
  <>
    <ActiveFocusOnly>
      <FocusSoundsPlayer />
      <YouTubeFocusMusicFloatingPlayer />
      <FocusNotifications />
      <LongFocusAutoStop />
      <MidnightFocusAutoStop />
    </ActiveFocusOnly>
    <FocusOnly>
      <FocusTaskObserver />
    </FocusOnly>
    <PausedFocusOnly>
      <PausedFocusAutoStop />
    </PausedFocusOnly>
  </>
)
