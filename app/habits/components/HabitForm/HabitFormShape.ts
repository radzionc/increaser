import { Habit } from 'habits/Habit'

export type HabitFormShape = Pick<Habit, 'emoji' | 'name' | 'color'>
