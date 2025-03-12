import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { attempt } from '@lib/utils/attempt'
import { getPublicFileUrl } from '@product/ui/storage/getPublicFileUrl'
import { Howl } from 'howler'
import { useCallback, useEffect, useRef } from 'react'

import { FocusSound } from '../focusSounds'
import { useFocusAudioMode } from '../state/useFocusAudioMode'
import { useIsFocusAudioEnabled } from '../state/useIsFocusAudioEnabled'

import { useFocusSoundsPreference } from './state/useFocusSoundsPreference'

export const FocusSoundsPlayer = () => {
  const [isFocusAudioEnabled] = useIsFocusAudioEnabled()
  const [focusAudioMode] = useFocusAudioMode()
  const [preference] = useFocusSoundsPreference()

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
    const isActive = focusAudioMode === 'sounds' && isFocusAudioEnabled

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
  }, [focusAudioMode, isFocusAudioEnabled, preference, stop])

  useEffect(() => {
    return stop
  }, [stop])

  return null
}
