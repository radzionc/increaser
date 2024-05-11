import {
  PersistentStateKey,
  usePersistentState,
} from '../../../state/persistentState'

export const focusAudioModes = ['none', 'youtube', 'sounds'] as const
export type FocusAudioMode = (typeof focusAudioModes)[number]

export const focusAduioModeName: Record<FocusAudioMode, string> = {
  none: 'Silent',
  youtube: 'YouTube',
  sounds: 'Sounds',
}

export const useFocusAudioMode = () => {
  return usePersistentState<FocusAudioMode>(
    PersistentStateKey.FocusAudioMode,
    'youtube',
  )
}
