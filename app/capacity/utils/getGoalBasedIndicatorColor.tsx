import { PrimaryGoal } from 'capacity/PrimaryGoal'
import { match } from 'shared/utils/match'
import { TextColor } from '@increaser/ui/ui/Text'

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
