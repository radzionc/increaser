import { IconButton } from '@lib/ui/buttons/IconButton'
import { HStack } from '@lib/ui/css/stack'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'

import { FloatingWidgetContainer } from '../../../floatingWidget/FloatingWidgetContainer'
import { FloatingWidgetHeader } from '../../../floatingWidget/FloatingWidgetHeader'
import { ManageFloatingWidgetPosition } from '../../../floatingWidget/ManageFloatingWidgetPosition'
import { useFocusAudioMode } from '../state/useFocusAudioMode'
import { useIsFocusAudioEnabled } from '../state/useIsFocusAudioEnabled'

import { ManageCurrentYouTubeMusic } from './ManageCurrentYouTubeMusic'
import { useYouTubeFocusPreference } from './state/useYouTubeFocusPreference'
import { YouTubeFocusMusicPlayer } from './YouTubeFocusMusicPlayer'
import { useYouTubeFocusMusic } from './YouTubeFocusMusicProvider'

export const YouTubeFocusMusicFloatingPlayer = () => {
  const [focusAudioMode] = useFocusAudioMode()
  const [isFocusAudioEnabled] = useIsFocusAudioEnabled()
  const [{ url }] = useYouTubeFocusPreference()
  const [, setIsEnabled] = useIsFocusAudioEnabled()
  const { isPlaying } = useYouTubeFocusMusic()

  const isActive = focusAudioMode === 'youtube' && isFocusAudioEnabled && url

  if (!isActive) {
    return null
  }

  return (
    <FloatingWidgetContainer>
      <FloatingWidgetHeader>
        <ManageCurrentYouTubeMusic />
        <HStack>
          <ManageFloatingWidgetPosition />
          <IconButton
            kind="secondary"
            title="Turn off music"
            onClick={() => setIsEnabled(false)}
            icon={<CloseIcon />}
          />
        </HStack>
      </FloatingWidgetHeader>
      {isPlaying && <YouTubeFocusMusicPlayer />}
    </FloatingWidgetContainer>
  )
}
