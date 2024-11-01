import { EntityWithEmoji } from '@lib/utils/entities/EntityWithEmoji'
import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { EntityWithName } from '@lib/utils/entities/EntityWithName'

export const goalStatuses = ['toDo', 'inProgress', 'done'] as const
export type GoalStatus = (typeof goalStatuses)[number]

export const goalStatusNameRecord: Record<GoalStatus, string> = {
  done: 'Completed',
  inProgress: 'Active',
  toDo: 'Idea',
}

export type GoalTarget = {
  current?: number | null
  value?: number | null
}

export type Goal = EntityWithId &
  EntityWithEmoji &
  EntityWithName & {
    status: GoalStatus
    deadlineAt: string | number | null
    plan?: string | null
    target?: GoalTarget | null
    taskFactories?: string[]
    habits?: string[]
  }

export type ScheduledGoal = Omit<Goal, 'deadlineAt'> & {
  deadlineAt: string | number
}

export type Goals = Record<string, Goal>

export const goalDeadlineTypes = ['age', 'date', 'none'] as const
export type GoalDeadlineType = (typeof goalDeadlineTypes)[number]
export const goalDeadlineName: Record<GoalDeadlineType, string> = {
  age: 'Age',
  date: 'Date',
  none: 'No deadline',
}
