import { Habit } from 'habits/Habit'
import { getValueProviderSetup } from '@increaser/ui/state/getValueProviderSetup'

export const { useValue: useCurrentHabit, provider: CurrentHabitProvider } =
  getValueProviderSetup<Habit>('Habit')
