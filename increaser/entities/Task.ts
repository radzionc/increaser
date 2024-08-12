import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { EntityWithName } from '@lib/utils/entities/EntityWithName'
import { EntityWithOrder } from '@lib/utils/entities/EntityWithOrder'

export type TaskLink = {
  url: string
  name: string
}

export type TaskChecklistItem = EntityWithId & {
  name: string
  completed: boolean
  order: number
}

export const taskStatuses = ['backlog', 'todo'] as const
export type TaskStatus = (typeof taskStatuses)[number]

export type Task = EntityWithId &
  EntityWithName &
  EntityWithOrder & {
    startedAt: number
    completedAt?: number | null
    status: TaskStatus
    projectId: string
    deadlineAt: number | null
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
