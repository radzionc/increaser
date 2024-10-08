import { Task } from './Task'

export const taskCadence = ['workday', 'day', 'week', 'month'] as const
export type TaskCadence = (typeof taskCadence)[number]

export type TaskFactory = Pick<
  Task,
  'id' | 'name' | 'description' | 'projectId' | 'links' | 'checklist'
> & {
  cadence: TaskCadence
  // day cadence: none
  // workday cadence: none
  // week cadence: 0-6
  // month cadence: 0-30
  deadlineIndex?: number | null
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

export type ForecastedTask = Omit<TaskFactory, 'lastOutputAt' | 'id'> & {
  willBeCreatedAt: number
  factoryId: string
}
