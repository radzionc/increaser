import { useCallback, useEffect, useRef } from 'react'
import { useFocusSoundsPreference } from './state/useFocusSoundsPreference'
import { useFocusAudioMode } from '../state/useFocusAudioMode'
import { attempt } from '@lib/utils/attempt'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useIsFocusAudioEnabled } from '../state/useIsFocusAudioEnabled'
import { Howl } from 'howler'
import { FocusSound } from '../focusSounds'
import { getPublicFileUrl } from '@increaser/ui/storage/getPublicFileUrl'
import { useIsFocusPaused } from '@increaser/ui/focus/utils/useIsFocusPaused'

export const FocusSoundsPlayer = () => {
  const [isFocusAudioEnabled] = useIsFocusAudioEnabled()
  const [focusAudioMode] = useFocusAudioMode()
  const [preference] = useFocusSoundsPreference()
  const isPaused = useIsFocusPaused()

  const audioRecordRef = useRef<Partial<Record<FocusSound, Howl>>>({})

  const stop = useCallback(() => {
    Object.values(audioRecordRef.current).forEach((howl) =>
      attempt(() => {
        if (howl.playing()) {
          howl.pause()
        }
      }, undefined),
    )
  }, [])

  useEffect(() => {
    const audioRecord = audioRecordRef.current
    const isActive =
      focusAudioMode === 'sounds' && isFocusAudioEnabled && !isPaused

    if (isActive) {
      Object.entries(preference).forEach(([sound, volume]) =>
        attempt(() => {
          const id = sound as FocusSound
          if (!audioRecord[id]) {
            audioRecord[id] = new Howl({
              src: getPublicFileUrl(`sounds/${id}.mp3`),
              loop: true,
              volume: volume,
            })
          }

          const howl = shouldBePresent(audioRecord[id])
          if (!howl.playing()) {
            howl.play()
          }
          howl.volume(volume)
        }, undefined),
      )

      Object.entries(audioRecord).forEach(([sound, howl]) =>
        attempt(() => {
          const id = sound as FocusSound
          if (!preference[id] && howl.playing()) {
            howl.pause()
          }
        }, undefined),
      )
    } else {
      stop()
    }
  }, [focusAudioMode, isFocusAudioEnabled, isPaused, preference, stop])

  useEffect(() => {
    return stop
  }, [stop])

  return null
}
