import { GoalStatus, goalStatusNameRecord } from '@increaser/entities/Goal'
import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'

export type GoalStatusFilterType = GoalStatus | null

export const getGoalStatusFilterName = (status: GoalStatusFilterType) => {
  if (!status) {
    return 'All goals'
  }

  return goalStatusNameRecord[status]
}

export const useGoalStatusFilter = () => {
  return usePersistentState<GoalStatus | null>(
    PersistentStateKey.GoalsStatusFilter,
    'inProgress',
  )
}
