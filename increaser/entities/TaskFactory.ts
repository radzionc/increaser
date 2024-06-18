import { Task } from './Task'

export const taskCadence = ['workday', 'day', 'week'] as const
export type TaskCadence = (typeof taskCadence)[number]

export type TaskFactory = {
  id: string
  task: Pick<Task, 'name' | 'projectId' | 'links'>
  cadence: TaskCadence
  lastOutputAt: number
}
