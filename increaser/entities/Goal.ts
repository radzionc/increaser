export const goalStatuses = ['done', 'inProgress', 'toDo'] as const
export type GoalStatus = (typeof goalStatuses)[number]

export const goalStatusNameRecord: Record<GoalStatus, string> = {
  done: 'Done',
  inProgress: 'In progress',
  toDo: 'To do',
}

export type Goal = {
  id: string
  emoji: string
  order: number
  name: string
  status: GoalStatus
  deadlineAt: string | number
}

export type Goals = Record<string, Goal>

export const goalDeadlineTypes = ['age', 'date'] as const
export type GoalDeadlineType = (typeof goalDeadlineTypes)[number]
