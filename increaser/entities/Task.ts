import { EntityWithId } from '@lib/utils/entities/EntityWithId'

export type TaskLink = {
  url: string
  name: string
}

export type TaskChecklistItem = EntityWithId & {
  name: string
  completed: boolean
  order: number
}

export type Task = {
  startedAt: number
  id: string
  name: string
  completedAt?: number | null
  projectId: string
  deadlineAt: number | null
  order: number
  spentTime?: number
  links: TaskLink[]
  checklist: TaskChecklistItem[]
  factoryId?: string
  description: string
}

export type ScheduledTask = Omit<Task, 'deadlineAt'> & {
  deadlineAt: number
}

export type UnscheduledTask = Omit<Task, 'deadlineAt'> & {
  deadlineAt: null
}

export const deadlineTypes = [
  'today',
  'tomorrow',
  'thisWeek',
  'nextWeek',
  'thisMonth',
] as const
export type DeadlineType = (typeof deadlineTypes)[number]
export const deadlineStatuses = ['none', 'overdue', ...deadlineTypes] as const
export type DeadlineStatus = (typeof deadlineStatuses)[number]

export const deadlineName: Record<DeadlineStatus, string> = {
  none: 'No deadline',
  overdue: 'Overdue',
  today: 'Today',
  tomorrow: 'Tomorrow',
  thisWeek: 'This week',
  nextWeek: 'Next week',
  thisMonth: 'This month',
}
