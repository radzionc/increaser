import { TaskFactory } from '@increaser/entities/TaskFactory'

export type TaskFactoryFormShape = Omit<TaskFactory, 'lastOutputAt' | 'id'>
