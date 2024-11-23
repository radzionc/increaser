import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

export const useFocusNotificationsHaveSound = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.FocusNotificationsHaveSound,
    true,
  )
}
