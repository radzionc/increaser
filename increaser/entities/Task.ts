export interface Task {
  startedAt: number
  id: string
  name: string
  completedAt?: number | null
  deadlineAt: number
  order: number
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
