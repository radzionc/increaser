export const goalStatuses = ['done', 'inProgress', 'toDo'] as const
export type GoalStatus = (typeof goalStatuses)[number]

export const goalStatusNameRecord: Record<GoalStatus, string> = {
  done: 'Done',
  inProgress: 'In progress',
  toDo: 'To do',
}

export type Goal = {
  id: string
  order: number
  name: string
  status: GoalStatus
  deadlineAt?: string | null
}

export type Goals = Record<string, Goal>
