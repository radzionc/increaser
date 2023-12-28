import { match } from '@lib/utils/match'
import { TextColor } from '@lib/ui/text'
import { PrimaryGoal } from '@increaser/entities/User'

export const getGoalBasedIndicatorColor = (
  goal: PrimaryGoal,
  value: number,
  budget: number,
): TextColor => {
  const isOverBudget = value > budget

  return match(goal, {
    workMore: () => (isOverBudget ? 'success' : 'alert'),
    workLess: () => (isOverBudget ? 'alert' : 'success'),
    awareness: () => 'supporting',
  })
}
