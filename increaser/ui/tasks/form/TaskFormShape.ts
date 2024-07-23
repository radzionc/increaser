import { Task } from '@increaser/entities/Task'

export type TaskFormShape = Pick<
  Task,
  'name' | 'projectId' | 'links' | 'checklist' | 'description' | 'deadlineAt'
>
