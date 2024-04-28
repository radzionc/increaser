import { WorkBudget } from '@increaser/entities/WorkBudget'
import { range } from '@lib/utils/array/range'
import { weekendsNumber, workdaysNumber } from '@lib/utils/time/workweek'

export const toDaysBudget = ({
  workdayHours,
  weekendHours,
}: WorkBudget): number[] => [
  ...range(workdaysNumber).map(() => workdayHours),
  ...range(weekendsNumber).map(() => weekendHours),
]
