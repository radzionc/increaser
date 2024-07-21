import { TaskTemplate } from '@increaser/entities/TaskTemplate'

export type TaskTemplateFormShape = Omit<TaskTemplate, 'id'>
