import { User } from './User'

export interface UserPerformanceRecord {
  dailyAvgInMinutes: number
  avgBlockInMinutes: number
  id: string
  profile?: Pick<User, 'name' | 'country'>
}

export interface PerformanceScoreboard {
  id: string
  syncedAt: number
  users: UserPerformanceRecord[]
}
