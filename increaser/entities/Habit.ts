export interface Habit {
  id: string
  name: string
  emoji: string
  color: number
  startedAt: number
  successes: string[]
  order: number
}

export const habitDefaultFields = {
  successes: [],
}
