import {
  PersistentStateKey,
  usePersistentState,
} from '../../../../state/persistentState'

export const useIsChecklistOpen = () => {
  return usePersistentState<boolean>(PersistentStateKey.IsChecklistOpen, false)
}
