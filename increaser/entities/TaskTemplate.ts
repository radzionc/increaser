import { Task } from './Task'

export type TaskTemplate = Pick<
  Task,
  'id' | 'name' | 'projectId' | 'links' | 'checklist' | 'description'
>

export type TaskTemplates = Record<string, TaskTemplate>
