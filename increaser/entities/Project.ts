export interface ProjectWeek {
  year: number
  week: number
  seconds: number
}

export interface ProjectMonth {
  year: number
  month: number
  seconds: number
}

export const ProjectStatus = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
} as const

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]

export interface Project {
  id: string
  name: string
  color: number
  emoji: string
  status: ProjectStatus
  allocatedMinutesPerWeek: number
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
