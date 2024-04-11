import { ProjectMonth, ProjectWeek } from './timeTracking'

export const projectsStatuses = ['active', 'inactive', 'archived'] as const
export type ProjectStatus = (typeof projectsStatuses)[number]

export const projectGoals = ['doMore', 'doLess'] as const
export type ProjectGoal = (typeof projectGoals)[number]

export const projectWorkingDays = ['everyday', 'workdays'] as const
export type ProjectWorkingDays = (typeof projectWorkingDays)[number]

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
  workingDays: ProjectWorkingDays
}

export const projectDefaultFields: Pick<
  Project,
  'status' | 'allocatedMinutesPerWeek' | 'weeks' | 'months' | 'workingDays'
> = {
  status: 'active',
  allocatedMinutesPerWeek: 0,
  weeks: [],
  months: [],
  workingDays: 'everyday',
}
