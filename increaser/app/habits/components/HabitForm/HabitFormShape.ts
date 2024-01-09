import { Habit } from '@increaser/entities/Habit'

export type HabitFormShape = Pick<Habit, 'emoji' | 'name' | 'color'>
