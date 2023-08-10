export interface UserPerformanceRecord {
  dailyAvgInMinutes: number
  avgBlockInMinutes: number
  id: string
  name: string | undefined
  country: string | undefined
}

export interface PerformanceScoreboard {
  createdAt: number
  users: UserPerformanceRecord[]
}
