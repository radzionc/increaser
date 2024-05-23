import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

export const useIsFocusAudioEnabled = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.IsFocusAudioEnabled,
    true,
  )
}
