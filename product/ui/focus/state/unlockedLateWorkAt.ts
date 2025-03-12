import { usePersistentState } from '../../state/persistentState'
import { PersistentStateKey } from '../../state/persistentState'

export const useUnlockedLateWorkAt = () => {
  return usePersistentState<number | null>(
    PersistentStateKey.UnlockedLateWorkAt,
    null,
  )
}
