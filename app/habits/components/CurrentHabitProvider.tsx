import { Habit } from 'habits/Habit'
import { getValueProviderSetup } from 'shared/utils/getValueProviderSetup'

export const { useValue: useCurrentHabit, provider: CurrentHabitProvider } =
  getValueProviderSetup<Habit>('Habit')
