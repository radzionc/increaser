import { User } from './User'

export type UserProfile = Pick<User, 'name' | 'country'>

export interface UserPerformanceRecord {
  dailyAvgInMinutes: number
  avgBlockInMinutes: number
  id: string
  profile?: UserProfile
}

export const scoreboardPeriods = ['week'] as const
export type ScoreboardPeriod = (typeof scoreboardPeriods)[number]

export interface PerformanceScoreboard {
  id: ScoreboardPeriod
  syncedAt: number
  users: UserPerformanceRecord[]
}

export const scoreboardPeriodInDays: Record<ScoreboardPeriod, number> = {
  week: 7,
}

export const scoreboardSensitiveUserFields: (keyof User)[] = [
  'isAnonymous',
  'country',
  'name',
]
