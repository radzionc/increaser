import { toDaysBudget } from '@increaser/entities-utils/workBudget/toDaysBudget'
import { useWorkBudget } from './useWorkBudget'

export const useDaysBudget = () => {
  const workBudget = useWorkBudget()

  return toDaysBudget(workBudget)
}
