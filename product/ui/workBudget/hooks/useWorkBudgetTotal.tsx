import { getWorkBudgetTotal } from '@product/entities-utils/workBudget/getWorkBudgetTotal'

import { useUser } from '../../user/state/user'

import { useWorkBudget } from './useWorkBudget'

export const useWorkBudgetTotal = () => {
  const workBudget = useWorkBudget()
  const { weekends } = useUser()

  return getWorkBudgetTotal({
    ...workBudget,
    weekends,
  })
}
