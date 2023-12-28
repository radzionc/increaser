import { Habit } from '@increaser/app/habits/Habit'

export type HabitFormShape = Pick<Habit, 'emoji' | 'name' | 'color'>
