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

export type Task = EntityWithId & {
  startedAt: number
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
