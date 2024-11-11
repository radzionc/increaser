import { getWorkBudgetTotal } from '@increaser/entities-utils/workBudget/getWorkBudgetTotal'
import { useWorkBudget } from './useWorkBudget'
import { useUser } from '../../user/state/user'

export const useWorkBudgetTotal = () => {
  const workBudget = useWorkBudget()
  const { weekends } = useUser()

  return getWorkBudgetTotal({
    ...workBudget,
    weekends,
  })
}
