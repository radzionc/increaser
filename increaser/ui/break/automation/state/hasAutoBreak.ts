import { PersistentStateKey } from '@increaser/ui/state/persistentState'

import { usePersistentState } from '@increaser/ui/state/persistentState'

export const useHasAutoBreak = () => {
  return usePersistentState<boolean>(PersistentStateKey.HasAutoBreak, true)
}
