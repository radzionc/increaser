import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

export const focusAudioModes = ['youtube', 'sounds'] as const
export type FocusAudioMode = (typeof focusAudioModes)[number]

export const focusAduioModeName: Record<FocusAudioMode, string> = {
  youtube: 'YouTube',
  sounds: 'Sounds',
}

export const useFocusAudioMode = () => {
  return usePersistentState<FocusAudioMode>(
    PersistentStateKey.FocusAudioMode,
    'youtube',
  )
}
