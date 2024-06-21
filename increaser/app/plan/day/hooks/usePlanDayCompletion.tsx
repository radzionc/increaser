import { useHaveToSubmitYesterdayHabits } from '../../../habits/hooks/useHaveToSubmitYesterdayHabits'
import { PlanDayStage } from '../PlanDayStage'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const usePlanDayCompletion = (): Record<PlanDayStage, boolean> => {
  const todayStartedAt = useStartOfDay()
  const haveToSubmitYesterdayHabits = useHaveToSubmitYesterdayHabits()
  const { reviewedGoalsAt, organizedTasksAt } = useAssertUserState()

  return {
    habits: !haveToSubmitYesterdayHabits,
    goals: !reviewedGoalsAt || reviewedGoalsAt < todayStartedAt,
    tasks: !organizedTasksAt || organizedTasksAt < todayStartedAt,
  }
}
