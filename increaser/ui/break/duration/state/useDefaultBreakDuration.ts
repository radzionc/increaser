import { PersistentStateKey } from '@increaser/ui/state/persistentState'

import { usePersistentState } from '@increaser/ui/state/persistentState'
import { BreakDuration } from '../../duration/BreakDuration'

export const useDefaultBreakDuration = () => {
  return usePersistentState<BreakDuration>(
    PersistentStateKey.DefaultBreakDuration,
    5,
  )
}
