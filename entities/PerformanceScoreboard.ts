interface UserPerformanceRecord {
  dailyAvgInMinutes: number
  id: string
  name: string | undefined
  country: string | undefined
}

export interface PerformanceScoreboard {
  createdAt: number
  users: UserPerformanceRecord[]
}
