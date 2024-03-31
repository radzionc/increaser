import { ProjectMonth, ProjectWeek } from './timeTracking'

export const ProjectStatus = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
} as const

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]

type ProjectGoal = 'doMore' | 'doLess'

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
