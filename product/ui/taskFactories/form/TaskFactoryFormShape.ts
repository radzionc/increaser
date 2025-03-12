import { TaskFactory } from '@product/entities/TaskFactory'

export type TaskFactoryFormShape = Omit<TaskFactory, 'lastOutputAt' | 'id'>
