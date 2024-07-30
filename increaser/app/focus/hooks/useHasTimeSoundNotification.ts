import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

export const useHasTimerSoundNotification = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.HasTimerSoundNotification,
    true,
  )
}
