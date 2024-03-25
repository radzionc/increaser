import { Month } from '@lib/utils/time/Month'
import { Week } from '@lib/utils/time/Week'

export type EntityWithSeconds = {
  seconds: number
}

export type ProjectWeek = Week & EntityWithSeconds

export type ProjectMonth = Month & EntityWithSeconds

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
