import { WorkBudget } from '@increaser/entities/WorkBudget'

type GetWorkBudgetTotalInput = WorkBudget & {
  weekends: number[]
}

export const getWorkBudgetTotal = ({
  workdayHours,
  weekendHours,
  weekends,
}: GetWorkBudgetTotalInput): number => {
  const weekendCount = weekends.length
  const workdayCount = 7 - weekendCount

  return workdayHours * workdayCount + weekendHours * weekendCount
}
