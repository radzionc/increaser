import {
  usePersistentState,
  PersistentStateKey,
} from '@product/ui/state/persistentState'

import { TaskTimeGrouping } from './TaskTimeGrouping'

export const useTaskTimeGrouping = () => {
  return usePersistentState<TaskTimeGrouping>(
    PersistentStateKey.TaskTimeGrouping,
    'day',
  )
}
