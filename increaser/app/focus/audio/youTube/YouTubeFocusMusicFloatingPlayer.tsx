import { useFocusAudioMode } from '../state/useFocusAudioMode'
import { useIsFocusAudioEnabled } from '../state/useIsFocusAudioEnabled'
import styled from 'styled-components'
import { YouTubeFocusMusicPlayer } from './YouTubeFocusMusicPlayer'
import { useYouTubeFocusPreference } from './state/useYouTubeFocusPreference'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { HStack } from '@lib/ui/css/stack'
import { getColor } from '@lib/ui/theme/getters'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { CloseIcon } from '@lib/ui/icons/CloseIcon'
import { useYouTubeFocusMusic } from './YouTubeFocusMusicProvider'
import { ManageCurrentYouTubeMusic } from './ManageCurrentYouTubeMusic'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { match } from '@lib/utils/match'
import { CSSProperties } from 'react'
import { ManageYouTubePlayerPosition } from './ManageYouTubePlayerPosition'
import { useYouTubePlayerPosition } from './state/useYouTubePlayerPosition'
import { RectangleCorner } from '@lib/ui/entities/RectangleCorner'
import { useIsFocusPaused } from '@increaser/ui/focus/utils/useIsFocusPaused'

const offset = 20

const Wrapper = styled.div`
  position: fixed;
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
  const [focusAudioMode] = useFocusAudioMode()
  const [isFocusAudioEnabled] = useIsFocusAudioEnabled()
  const [{ url }] = useYouTubeFocusPreference()
  const [, setIsEnabled] = useIsFocusAudioEnabled()
  const { isPlaying } = useYouTubeFocusMusic()
  const [position] = useYouTubePlayerPosition()

  const isPaused = useIsFocusPaused()

  const isActive =
    focusAudioMode === 'youtube' && isFocusAudioEnabled && url && !isPaused

  if (!isActive) {
    return null
  }

  return (
    <Wrapper
      style={match<RectangleCorner, CSSProperties>(position, {
        'bottom-left': () => ({ bottom: offset, left: offset }),
        'bottom-right': () => ({ bottom: offset, right: offset }),
        'top-left': () => ({ top: offset, left: offset }),
        'top-right': () => ({ top: offset, right: offset }),
      })}
    >
      <Header>
        <ManageCurrentYouTubeMusic />
        <HStack>
          <ManageYouTubePlayerPosition />
          <IconButton
            kind="secondary"
            title="Turn off music"
            onClick={() => setIsEnabled(false)}
            icon={<CloseIcon />}
          />
        </HStack>
      </Header>
      {isPlaying && <YouTubeFocusMusicPlayer />}
    </Wrapper>
  )
}
