import { TaskTemplate } from '@product/entities/TaskTemplate'

export type TaskTemplateFormShape = Omit<TaskTemplate, 'id'>
