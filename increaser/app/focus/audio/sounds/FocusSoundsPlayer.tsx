import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useCallback, useEffect, useRef } from 'react'
import { useFocusSoundsPreference } from './state/useFocusSoundsPreference'
import { useFocusAudioMode } from '../state/useFocusAudioMode'
import { attempt } from '@lib/utils/attempt'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useIsFocusAudioEnabled } from '../state/useIsFocusAudioEnabled'
import { Howl } from 'howler'
import { FocusSound } from '../focusSounds'

export const FocusSoundsPlayer = () => {
  const { currentSet } = useFocus()
  const [isFocusAudioEnabled] = useIsFocusAudioEnabled()
  const [focusAudioMode] = useFocusAudioMode()
  const [preference] = useFocusSoundsPreference()

  const audioRecordRef = useRef<Partial<Record<FocusSound, Howl>>>({})

  const stop = useCallback(() => {
    Object.values(audioRecordRef.current).forEach((howl) =>
      attempt(() => {
        howl.stop()
      }, undefined),
    )
  }, [])

  useEffect(() => {
    const audioRecord = audioRecordRef.current
    const isActive =
      currentSet && focusAudioMode === 'sounds' && isFocusAudioEnabled

    if (isActive) {
      Object.entries(preference).forEach(([sound, volume]) =>
        attempt(() => {
          const id = sound as FocusSound
          if (!audioRecord[id]) {
            audioRecord[id] = new Howl({
              src: [`audio/focus/${id}.mp3`],
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
          if (!preference[id]) {
            howl.stop()
          }
        }, undefined),
      )
    } else {
      stop()
    }
  }, [currentSet, focusAudioMode, isFocusAudioEnabled, preference, stop])

  return null
}
