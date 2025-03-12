import {
  usePersistentState,
  PersistentStateKey,
} from '@product/ui/state/persistentState'

export const useShouldHideProjectNames = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.ShouldHideProjectNames,
    false,
  )
}
