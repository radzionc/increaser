import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'

export const useFocusNotificationsHaveSound = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.FocusNotificationsHaveSound,
    true,
  )
}
