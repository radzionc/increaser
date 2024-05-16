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
  workingDays: ProjectWorkingDays
}

export const projectDefaultFields: Pick<
  Project,
  'status' | 'allocatedMinutesPerWeek' | 'workingDays'
> = {
  status: 'active',
  allocatedMinutesPerWeek: 0,
  workingDays: 'everyday',
}

export const goalOptionName: Record<ProjectGoal, string> = {
  doMore: 'at least',
  doLess: 'no more than',
}

export const workingDayOptionName: Record<ProjectWorkingDays, string> = {
  everyday: 'Every day',
  workdays: 'Monday to Friday',
}

export const otherProject: Project = {
  id: 'other',
  name: 'Other',
  color: 0,
  emoji: '❔',
  status: 'active',
  allocatedMinutesPerWeek: 0,
  workingDays: 'everyday',
}
