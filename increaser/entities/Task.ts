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
  'thisMonth',
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
  thisMonth: 'This month',
}
