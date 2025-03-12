import { PersistentStateKey } from '@product/ui/state/persistentState'
import { usePersistentState } from '@product/ui/state/persistentState'

import { BreakDuration } from '../BreakDuration'

export const useDefaultBreakDuration = () => {
  return usePersistentState<BreakDuration>(
    PersistentStateKey.DefaultBreakDuration,
    5,
  )
}
