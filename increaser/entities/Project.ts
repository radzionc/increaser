import { ProjectMonth, ProjectWeek } from './timeTracking'

export const ProjectStatus = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
} as const

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]

export const projectGoals = ['doMore', 'doLess'] as const
export type ProjectGoal = (typeof projectGoals)[number]

export interface Project {
  id: string
  name: string
  color: number
  emoji: string
  status: ProjectStatus
  allocatedMinutesPerWeek: number
  goal?: ProjectGoal | null
  weeks: ProjectWeek[]
  months: ProjectMonth[]
}

export const projectDefaultFields: Pick<
  Project,
  'status' | 'allocatedMinutesPerWeek' | 'weeks' | 'months'
> = {
  status: ProjectStatus.Active,
  allocatedMinutesPerWeek: 0,
  weeks: [],
  months: [],
}
