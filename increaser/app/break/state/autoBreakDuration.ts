import { PersistentStateKey } from '@increaser/ui/state/persistentState'

import { usePersistentState } from '@increaser/ui/state/persistentState'
import { BreakDuration } from '../types/BreakDuration'

export const useAutoBreakDuration = () => {
  return usePersistentState<BreakDuration | null>(
    PersistentStateKey.AutoBreakDuration,
    5,
  )
}
