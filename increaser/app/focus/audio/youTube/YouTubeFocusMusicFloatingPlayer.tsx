import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useFocusAudioMode } from '../state/useFocusAudioMode'
import { useIsFocusAudioEnabled } from '../state/useIsFocusAudioEnabled'
import styled from 'styled-components'
import { YouTubeFocusMusicPlayer } from './YouTubeFocusMusicPlayer'
import { useYouTubeFocusPreference } from './state/useYouTubeFocusPreference'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { HStack } from '@lib/ui/layout/Stack'
import { getColor } from '@lib/ui/theme/getters'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { useYouTubeFocusMusic } from './YouTubeFocusMusicProvider'
import { ManageCurrentYouTubeMusic } from './ManageCurrentYouTubeMusic'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 320px;
  z-index: 1;
  ${borderRadius.m};
  overflow: hidden;
  border: 2px solid ${getHoverVariant('foreground')};
`

const Header = styled(HStack)`
  padding: 8px 8px 8px 12px;
  background: ${getColor('foreground')};
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const YouTubeFocusMusicFloatingPlayer = () => {
  const { currentSet } = useFocus()
  const [focusAudioMode] = useFocusAudioMode()
  const [isFocusAudioEnabled] = useIsFocusAudioEnabled()
  const [{ url }] = useYouTubeFocusPreference()
  const [, setIsEnabled] = useIsFocusAudioEnabled()
  const { isPlaying } = useYouTubeFocusMusic()

  const isActive =
    currentSet && focusAudioMode === 'youtube' && isFocusAudioEnabled && url

  if (!isActive) {
    return null
  }

  return (
    <Wrapper>
      <Header>
        <ManageCurrentYouTubeMusic />
        <IconButton
          kind="secondary"
          title="Turn off music"
          onClick={() => setIsEnabled(false)}
          icon={<CloseIcon />}
        />
      </Header>
      {isPlaying && <YouTubeFocusMusicPlayer />}
    </Wrapper>
  )
}
