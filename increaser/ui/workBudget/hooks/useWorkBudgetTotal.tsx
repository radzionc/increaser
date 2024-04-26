import { getWorkBudgetTotal } from '@increaser/entities-utils/workBudget/getWorkBudgetTotal'
import { useWorkBudget } from './useWorkBudget'

export const useWorkBudgetTotal = () => {
  const workBudget = useWorkBudget()

  return getWorkBudgetTotal(workBudget)
}
