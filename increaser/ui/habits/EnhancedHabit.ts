import { Habit } from '@increaser/entities/Habit'
import { HSLA } from '@lib/ui/colors/HSLA'

export interface EnhancedHabit extends Habit {
  successesSet: Set<string>
  passedDays: number[]
  hslaColor: HSLA
  streak: number
}

const defaultHabitEmojis = ['💪', '🍏', '🏋️‍♀️', '🧘‍♀️', '🏄🏾‍♂️', '🎸']
