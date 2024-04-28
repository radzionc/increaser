import { useDaysBudget } from '@increaser/ui/workBudget/hooks/useDaysBudget'
import { cumulativeSum } from '@lib/utils/math/cumulativeSum'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const useWorkBudgetData = () => {
  const daysBudget = useDaysBudget()

  return cumulativeSum(daysBudget).map((value) =>
    convertDuration(value, 'h', 'min'),
  )
}
