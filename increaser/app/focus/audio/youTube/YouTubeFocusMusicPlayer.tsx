import YouTubePlayer from 'react-player/lazy'
import styled from 'styled-components'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getColor } from '@lib/ui/theme/getters'
import { useYouTubeFocusPreference } from './state/useYouTubeFocusPreference'
import { useYouTubeFocusMusic } from './YouTubeFocusMusicProvider'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useRef, useCallback } from 'react'
import ReactPlayer from 'react-player'
import { useThrottle } from '@lib/ui/hooks/useThrottle'

const youTubeVideoRatio = 9 / 16

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  background: ${getColor('foreground')};
`

export const YouTubeFocusMusicPlayer = () => {
  const { focusSounds } = useAssertUserState()
  const [{ url }] = useYouTubeFocusPreference()
  const { isPlaying, setState } = useYouTubeFocusMusic()

  const sound = shouldBeDefined(focusSounds.find((sound) => sound.url === url))

  const [timeLeftRecord, setTimeLeftRecord] = usePersistentState<
    Record<string, number>
  >(PersistentStateKey.YouTubeFocusMusicLeftAt, {})

  const playerRef = useRef<ReactPlayer>(null)

  const savePlaybackTime = useCallback(
    (playedSeconds: number) => {
      setTimeLeftRecord((prev) => ({ ...prev, [sound.url]: playedSeconds }))
    },
    [sound.url, setTimeLeftRecord],
  )

  const handleProgress = useThrottle(
    ({ playedSeconds }: { playedSeconds: number }) => {
      savePlaybackTime(playedSeconds)
    },
    1000,
  )

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const height = (size?.width || 0) * youTubeVideoRatio

        return (
          <Container
            style={height ? { minHeight: height } : undefined}
            ref={setElement}
          >
            {size && sound && (
              <YouTubePlayer
                loop
                width={size.width}
                height={height}
                url={sound.url}
                playing={isPlaying}
                onPause={() =>
                  setState((state) => ({ ...state, isPlaying: false }))
                }
                onPlay={() =>
                  setState((state) => ({ ...state, isPlaying: true }))
                }
                volume={0.8}
                ref={playerRef}
                onReady={() => {
                  const time = timeLeftRecord[sound.url] || 0
                  if (time > 0) {
                    playerRef.current?.seekTo(time, 'seconds')
                  }
                }}
                onProgress={handleProgress}
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      iv_load_policy: 3,
                    },
                  },
                }}
              />
            )}
          </Container>
        )
      }}
    />
  )
}
