import { User } from './User'

export interface UserPerformanceRecord {
  dailyAvgInMinutes: number
  avgBlockInMinutes: number
  id: string
  profile?: Pick<User, 'name' | 'country'>
}

export const scoreboardPeriods = ['month'] as const
export type ScoreboardPeriod = (typeof scoreboardPeriods)[number]

export interface PerformanceScoreboard {
  id: ScoreboardPeriod
  syncedAt: number
  users: UserPerformanceRecord[]
}

export const scoreboardPeriodInDays: Record<ScoreboardPeriod, number> = {
  month: 4,
}
