import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { TimeGrouping } from './TimeGrouping'

export const useTimeGrouping = () => {
  return usePersistentState<TimeGrouping>(
    PersistentStateKey.TimeGrouping,
    'day',
  )
}
