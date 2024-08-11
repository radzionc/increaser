import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'

export const useIsCurrentPeriodIncluded = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.IsCurrentPeriodIncluded,
    true,
  )
}
