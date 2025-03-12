import {
  FocusDuration,
  maxFocusDuration,
} from '@product/entities/FocusDuration'
import {
  usePersistentState,
  PersistentStateKey,
} from '@product/ui/state/persistentState'

export type FocusTarget = {
  projectId: string | null
  taskId: string | null
}

export const useFocusDuration = () => {
  return usePersistentState<FocusDuration>(
    PersistentStateKey.FocusDuration,
    maxFocusDuration,
  )
}
