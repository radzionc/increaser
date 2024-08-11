import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'

export const useShouldHideProjectNames = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.ShouldHideProjectNames,
    false,
  )
}
