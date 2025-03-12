import { PersistentStateKey } from '../../../state/persistentState'
import { usePersistentState } from '../../../state/persistentState'

export const useAutoBreakStartedAt = () => {
  return usePersistentState<number | null>(
    PersistentStateKey.AutoBreakStartedAt,
    null,
  )
}
