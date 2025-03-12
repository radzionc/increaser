import { Task } from '@product/entities/Task'

export type TaskFormShape = Pick<
  Task,
  | 'name'
  | 'projectId'
  | 'links'
  | 'checklist'
  | 'description'
  | 'deadlineAt'
  | 'status'
>
