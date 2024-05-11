import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useCallback, useEffect, useRef } from 'react'
import {
  FocusSound,
  useFocusSoundsPreference,
} from './state/useFocusSoundsPreference'
import { useFocusAudioMode } from '../state/useFocusAudioMode'
import { attempt } from '@lib/utils/attempt'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const FocusSoundsPlayer = () => {
  const { currentSet } = useFocus()
  const [focusAudioMode] = useFocusAudioMode()
  const [preference] = useFocusSoundsPreference()

  const audioRecordRef = useRef<Partial<Record<FocusSound, HTMLAudioElement>>>(
    {},
  )

  const stop = useCallback(() => {
    Object.values(audioRecordRef.current).forEach((audio) =>
      attempt(() => {
        audio.pause()
      }, undefined),
    )
  }, [])

  useEffect(() => {
    const audioRecord = audioRecordRef.current
    const isActive = currentSet && focusAudioMode === 'sounds'

    if (isActive) {
      Object.entries(preference).forEach(([sound, volume]) =>
        attempt(() => {
          const id = sound as FocusSound
          if (!audioRecord[id]) {
            audioRecord[id] = new Audio(`audio/focus/${id}.mp3`)
          }

          const audio = shouldBePresent(audioRecord[id])
          audio.play()
          audio.volume = volume
          audio.loop = true
        }, undefined),
      )

      Object.entries(audioRecord).forEach(([sound, audio]) =>
        attempt(() => {
          const id = sound as FocusSound
          if (!preference[id]) {
            audio.pause()
          }
        }, undefined),
      )
    } else {
      stop()
    }

    return () => {
      stop()
    }
  }, [currentSet, focusAudioMode, preference, stop])

  return null
}
