import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useEffect, useRef } from 'react'
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

  const audioRef = useRef<Partial<Record<FocusSound, HTMLAudioElement>>>({})

  useEffect(() => {
    const audioRecord = audioRef.current
    if (!currentSet || focusAudioMode !== 'sounds') {
      Object.values(audioRecord).forEach((audio) =>
        attempt(() => {
          console.log('audio: ', audio)
          audio.pause()
        }, undefined),
      )

      return
    }

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

    return () => {
      Object.values(audioRecord).forEach((audio) =>
        attempt(() => {
          audio.pause()
        }, undefined),
      )
    }
  }, [currentSet, focusAudioMode, preference])

  return null
}
