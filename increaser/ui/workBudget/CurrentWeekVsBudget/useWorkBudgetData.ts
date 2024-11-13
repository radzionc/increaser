import { useDaysBudget } from '@increaser/ui/workBudget/hooks/useDaysBudget'
import { cumulativeSum } from '@lib/utils/math/cumulativeSum'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useMemo } from 'react'

export const useWorkBudgetData = () => {
  const daysBudget = useDaysBudget()

  return useMemo(
    () => [
      0,
      ...cumulativeSum(daysBudget).map((value) =>
        convertDuration(value, 'h', 'min'),
      ),
    ],
    [daysBudget],
  )
}
