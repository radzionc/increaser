import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { Habit } from '@product/entities/Habit'

export const { useValue: useCurrentHabit, provider: CurrentHabitProvider } =
  getValueProviderSetup<Habit>('Habit')
