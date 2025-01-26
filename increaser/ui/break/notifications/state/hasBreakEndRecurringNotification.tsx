import { PersistentStateKey } from '@increaser/ui/state/persistentState'

import { usePersistentState } from '@increaser/ui/state/persistentState'

export const useHasBreakEndRecurringNotification = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.HasBreakEndRecurringNotification,
    true,
  )
}
