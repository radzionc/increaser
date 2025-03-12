import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { Goal } from '@product/entities/Goal'

export const { useValue: useCurrentGoal, provider: CurrentGoalProvider } =
  getValueProviderSetup<Goal>('Goal')
