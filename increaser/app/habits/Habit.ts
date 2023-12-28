import { HSLA } from '@lib/ui/colors/HSLA'

export interface HabitResponse {
  id: string
  name: string
  emoji: string
  color: number
  startedAt: number
  order: number
  successes: string[]
}

export interface Habit extends HabitResponse {
  successesSet: Set<string>
  passedDays: number[]
  hslaColor: HSLA
  streak: number
}

export const defaultHabitEmojis = ['💪', '🍏', '🏋️‍♀️', '🧘‍♀️', '🏄🏾‍♂️', '🎸']
