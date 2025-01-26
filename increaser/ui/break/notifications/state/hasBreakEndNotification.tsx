import { PersistentStateKey } from '@increaser/ui/state/persistentState'

import { usePersistentState } from '@increaser/ui/state/persistentState'

export const useHasBreakEndNotification = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.HasBreakEndNotification,
    true,
  )
}
