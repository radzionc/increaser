import { EntityWithId } from '@lib/utils/entities/EntityWithId'
import { EntityWithName } from '@lib/utils/entities/EntityWithName'
import { EntityWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { EntityWithStartDate } from '@lib/utils/entities/EntityWithStartDate'

import { ProjectRelatedEntity } from './Project'

export type TaskLink = {
  url: string
  name: string
}

export type TaskChecklistItem = EntityWithId & {
  name: string
  completed: boolean
  order: number
}

export const taskStatuses = ['backlog', 'todo', 'inProgress', 'done'] as const
export type TaskStatus = (typeof taskStatuses)[number]

export const taskStatusName: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  todo: 'Todo',
  inProgress: 'In progress',
  done: 'Done',
}

export type Task = EntityWithId &
  EntityWithName &
  EntityWithOrder &
  ProjectRelatedEntity &
  EntityWithStartDate & {
    status: TaskStatus
    deadlineAt: number | null
    spentTime?: number
    links: TaskLink[]
    checklist: TaskChecklistItem[]
    factoryId?: string
    description: string
    deadlineOrder: number
  }

export type ScheduledTask = Omit<Task, 'deadlineAt'> & {
  deadlineAt: number
}

export type UnscheduledTask = Omit<Task, 'deadlineAt'> & {
  deadlineAt: null
}
