import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

export const useBreakNotificationsHaveSound = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.BreakNotificationsHaveSound,
    true,
  )
}
