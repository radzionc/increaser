import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'

export const useUserChangedFocusDurationAt = () => {
  return usePersistentState<number | null>(
    PersistentStateKey.UserChangedFocusDurationAt,
    null,
  )
}
