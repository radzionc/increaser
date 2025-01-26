import { useFocusAudioMode } from '../state/useFocusAudioMode'
import { useIsFocusAudioEnabled } from '../state/useIsFocusAudioEnabled'
import styled from 'styled-components'
import { YouTubeFocusMusicPlayer } from './YouTubeFocusMusicPlayer'
import { useYouTubeFocusPreference } from './state/useYouTubeFocusPreference'
import { HStack } from '@lib/ui/css/stack'
import { getColor } from '@lib/ui/theme/getters'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { useYouTubeFocusMusic } from './YouTubeFocusMusicProvider'
import { ManageCurrentYouTubeMusic } from './ManageCurrentYouTubeMusic'
import { ManageFloatingWidgetPosition } from '../../../floatingWidget/ManageFloatingWidgetPosition'
import { FloatingWidgetContainer } from '../../../floatingWidget/FloatingWidgetContainer'

const Header = styled(HStack)`
  padding: 8px 8px 8px 12px;
  background: ${getColor('foreground')};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
`

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
      <Header>
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
      </Header>
      {isPlaying && <YouTubeFocusMusicPlayer />}
    </FloatingWidgetContainer>
  )
}
