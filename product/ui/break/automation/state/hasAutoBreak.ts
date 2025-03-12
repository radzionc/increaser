import { PersistentStateKey } from '@product/ui/state/persistentState'
import { usePersistentState } from '@product/ui/state/persistentState'

export const useHasAutoBreak = () => {
  return usePersistentState<boolean>(PersistentStateKey.HasAutoBreak, true)
}
