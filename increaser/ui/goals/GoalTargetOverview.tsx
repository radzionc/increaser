import { useCurrentGoal } from './CurrentGoalProvider'

export const GoalTargetOverview = () => {
  const { target } = useCurrentGoal()

  if (!target || !target.value || !target.current) return null
}
