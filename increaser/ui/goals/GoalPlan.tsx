import { useCurrentGoal } from './CurrentGoalProvider'
import { Text } from '@lib/ui/text'
import { MapIcon } from '@lib/ui/icons/MapIcon'
import { GoalSection } from './GoalSection'

export const GoalPlan = () => {
  const { plan } = useCurrentGoal()

  if (!plan) return null

  return (
    <GoalSection icon={<MapIcon />}>
      <Text>{plan}</Text>
    </GoalSection>
  )
}
