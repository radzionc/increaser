import { Goal } from '@increaser/entities/Goal'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const { useValue: useCurrentGoal, provider: CurrentGoalProvider } =
  getValueProviderSetup<Goal>('Goal')
