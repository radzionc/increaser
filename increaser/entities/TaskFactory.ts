import { Task } from './Task'

export const taskCadence = ['workday', 'day', 'week', 'month'] as const
export type TaskCadence = (typeof taskCadence)[number]

export type TaskFactory = {
  id: string
  task: Pick<Task, 'name' | 'projectId' | 'links'>
  cadence: TaskCadence
  lastOutputAt?: number
}

export const taskCadenceName: Record<TaskCadence, string> = {
  workday: 'Every workday',
  day: 'Every day',
  week: 'Every week',
  month: 'Every month',
}

export const taskCadenceShortName: Record<TaskCadence, string> = {
  workday: 'mon-fri',
  day: 'daily',
  week: 'weekly',
  month: 'monthly',
}
