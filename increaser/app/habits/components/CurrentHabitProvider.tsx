import { Habit } from '@increaser/app/habits/Habit'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const { useValue: useCurrentHabit, provider: CurrentHabitProvider } =
  getValueProviderSetup<Habit>('Habit')
