import { User } from './User'

export type UserProfile = Pick<User, 'name' | 'country'>

export interface UserPerformanceRecord {
  dailyAvgInMinutes: number
  avgBlockInMinutes: number
  id: string
  profile?: UserProfile
}

export const scoreboardPeriods = ['month'] as const
export type ScoreboardPeriod = (typeof scoreboardPeriods)[number]

export interface PerformanceScoreboard {
  id: ScoreboardPeriod
  syncedAt: number
  users: UserPerformanceRecord[]
}

export const scoreboardPeriodInDays: Record<ScoreboardPeriod, number> = {
  month: 5,
}

export const scoreboardSensitiveUserFields: (keyof User)[] = [
  'isAnonymous',
  'country',
  'name',
]
