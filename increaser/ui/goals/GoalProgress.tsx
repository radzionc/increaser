import { useCurrentGoal } from './CurrentGoalProvider'
import { GoalSection } from './GoalSection'
import { BadgePercentIcon } from '@lib/ui/icons/BadgePercentIcon'
import { toPercents } from '@lib/utils/toPercents'

export const GoalProgress = () => {
  const { target } = useCurrentGoal()

  if (!target) {
    return null
  }

  const text = `${target.current} / ${target.value} (${toPercents(
    target.current / target.value,
    'round',
  )})`

  return <GoalSection icon={<BadgePercentIcon />}>{text}</GoalSection>
}
