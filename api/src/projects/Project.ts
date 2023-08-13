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

export enum ProjectStatus {
  Inactive = 'INACTIVE',
  Active = 'ACTIVE',
}

export interface Project {
  id: string
  name: string
  color: number
  emoji: string
  total: number
  status: ProjectStatus
  allocatedMinutesPerWeek: number
  weeks: ProjectWeek[]
  months: ProjectMonth[]
}

export const defaultProjectProperties: Pick<
  Project,
  'total' | 'status' | 'allocatedMinutesPerWeek' | 'weeks' | 'months'
> = {
  total: 0,
  status: ProjectStatus.Active,
  allocatedMinutesPerWeek: 0,
  weeks: [],
  months: [],
}
