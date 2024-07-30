import { GoalStatus } from '@increaser/entities/Goal'
import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'

export const useGoalStatusFilter = () => {
  return usePersistentState<GoalStatus | null>(
    PersistentStateKey.GoalsStatusFilter,
    'inProgress',
  )
}
