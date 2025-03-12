import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'

export const useIsFocusAudioEnabled = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.IsFocusAudioEnabled,
    true,
  )
}
