import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'

export const useBreakNotificationsHaveSound = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.BreakNotificationsHaveSound,
    true,
  )
}
