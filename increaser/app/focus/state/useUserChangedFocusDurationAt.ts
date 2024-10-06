import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

export const useUserChangedFocusDurationAt = () => {
  return usePersistentState<number | null>(
    PersistentStateKey.UserChangedFocusDurationAt,
    null,
  )
}
