export interface Task {
  startedAt: number
  id: string
  name: string
  completedAt?: number
  deadlineAt: number
}

export const deadlineTypes = [
  'today',
  'tomorrow',
  'thisWeek',
  'nextWeek',
] as const
export type DeadlineType = (typeof deadlineTypes)[number]

export const deadlineName: Record<DeadlineType, string> = {
  today: 'Today',
  tomorrow: 'Tomorrow',
  thisWeek: 'This week',
  nextWeek: 'Next week',
}
