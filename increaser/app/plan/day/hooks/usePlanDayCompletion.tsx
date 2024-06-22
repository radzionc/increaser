import { useHaveToSubmitYesterdayHabits } from '../../../habits/hooks/useHaveToSubmitYesterdayHabits'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { PlanDayStep } from '../PlanDayStep'

export const usePlanDayCompletion = (): Record<PlanDayStep, boolean> => {
  const todayStartedAt = useStartOfDay()
  const haveToSubmitYesterdayHabits = useHaveToSubmitYesterdayHabits()
  const { reviewedGoalsAt, organizedTasksAt } = useAssertUserState()

  return {
    habits: !haveToSubmitYesterdayHabits,
    goals: reviewedGoalsAt ? reviewedGoalsAt >= todayStartedAt : false,
    tasks: organizedTasksAt ? organizedTasksAt >= todayStartedAt : false,
  }
}
