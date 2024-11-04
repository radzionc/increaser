import { defaultGoalDeadlineType } from '@increaser/entities/Goal'
import {
  PersistentStateKey,
  usePersistentState,
} from '../../../state/persistentState'

export const goalTimelineTypes = ['age', 'date'] as const
export type GoalTimelineType = (typeof goalTimelineTypes)[number]

export const goalTimelineName: Record<GoalTimelineType, string> = {
  age: 'Age',
  date: 'Date',
}

export const useGoalsTimelineType = () => {
  return usePersistentState(
    PersistentStateKey.GoalsTimelineType,
    defaultGoalDeadlineType,
  )
}
