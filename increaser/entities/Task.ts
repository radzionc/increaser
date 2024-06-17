export type TaskLink = {
  url: string
  name: string
}

export type Task = {
  startedAt: number
  id: string
  name: string
  completedAt?: number | null
  projectId: string
  deadlineAt: number
  order: number
  spentTime?: number
  links?: TaskLink[]
  factoryId?: string
}

export const deadlineTypes = [
  'today',
  'tomorrow',
  'thisWeek',
  'nextWeek',
] as const
export type DeadlineType = (typeof deadlineTypes)[number]
export const deadlineStatuses = ['overdue', ...deadlineTypes] as const
export type DeadlineStatus = (typeof deadlineStatuses)[number]

export const deadlineName: Record<DeadlineStatus, string> = {
  overdue: 'Overdue',
  today: 'Today',
  tomorrow: 'Tomorrow',
  thisWeek: 'This week',
  nextWeek: 'Next week',
}

export const taskCadence = ['workday', 'day', 'week'] as const
export type TaskCadence = (typeof taskCadence)[number]

export type TaskFactory = {
  id: string
  task: Pick<Task, 'name' | 'projectId' | 'links'>
  cadence: TaskCadence
  lastOutputAt: number
}
