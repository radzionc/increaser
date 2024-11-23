import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import {
  FocusDuration,
  maxFocusDuration,
} from '@increaser/entities/FocusDuration'

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
