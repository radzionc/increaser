import { FocusSoundsPlayer } from '@increaser/app/focus/audio/sounds/FocusSoundsPlayer'
import { YouTubeFocusMusicFloatingPlayer } from '@increaser/app/focus/audio/youTube/YouTubeFocusMusicFloatingPlayer'
import { ActiveFocusOnly } from '@increaser/app/focus/components/ActiveFocusOnly'
import { FocusOnly } from '@increaser/app/focus/components/FocusOnly'
import { FocusTaskObserver } from '@increaser/app/focus/components/FocusTaskObserver'
import { PausedFocusOnly } from '@increaser/app/focus/components/PausedFocusOnly'
import { FocusNotifications } from '@increaser/app/focus/notifications/FocusNotifications'
import { PausedFocusAutoStop } from './PausedFocusAutoStop'
import { FocusAutoStop } from './FocusAutoStop'
import { LastSetObserver } from './autoStop/LastSetObserver'

export const FocusManager = () => (
  <>
    <ActiveFocusOnly>
      <FocusSoundsPlayer />
      <YouTubeFocusMusicFloatingPlayer />
      <FocusNotifications />
      <FocusAutoStop />
    </ActiveFocusOnly>
    <FocusOnly>
      <FocusTaskObserver />
    </FocusOnly>
    <PausedFocusOnly>
      <PausedFocusAutoStop />
    </PausedFocusOnly>
    <LastSetObserver />
  </>
)
