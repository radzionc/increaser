import { range } from '@lib/utils/array/range'
import { D_IN_WEEK } from '@lib/utils/time'
import { WorkBudget } from '@product/entities/WorkBudget'

type Input = WorkBudget & {
  weekends: number[]
}

export const toDaysBudget = ({
  workdayHours,
  weekendHours,
  weekends,
}: Input): number[] =>
  range(D_IN_WEEK).map((day) =>
    weekends.includes(day) ? weekendHours : workdayHours,
  )
