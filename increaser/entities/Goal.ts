import { EntityWithEmoji } from '@lib/utils/entities/EntityWithEmoji'
import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { EntityWithName } from '@lib/utils/entities/EntityWithName'

export const goalStatuses = ['toDo', 'inProgress', 'done'] as const
export type GoalStatus = (typeof goalStatuses)[number]

export const goalStatusNameRecord: Record<GoalStatus, string> = {
  done: 'Done',
  inProgress: 'Active',
  toDo: 'Idea',
}

export type GoalTarget = {
  current: number
  value: number
}

export type Goal = EntityWithId &
  EntityWithEmoji &
  EntityWithName & {
    status: GoalStatus
    deadlineAt: string | number | null
    plan?: string | null
    target?: GoalTarget | null
    taskFactories?: string[]
  }

export type Goals = Record<string, Goal>

export const goalDeadlineTypes = ['age', 'date', 'none'] as const
export type GoalDeadlineType = (typeof goalDeadlineTypes)[number]
export const goalDeadlineName: Record<GoalDeadlineType, string> = {
  age: 'Age',
  date: 'Date',
  none: 'No deadline',
}
