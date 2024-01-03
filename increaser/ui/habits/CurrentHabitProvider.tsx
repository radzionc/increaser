import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { EnhancedHabit } from './EnhancedHabit'

export const { useValue: useCurrentHabit, provider: CurrentHabitProvider } =
  getValueProviderSetup<EnhancedHabit>('Habit')
