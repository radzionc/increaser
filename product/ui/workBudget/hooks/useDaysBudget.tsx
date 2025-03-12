import { toDaysBudget } from '@product/entities-utils/workBudget/toDaysBudget'

import { useUser } from '../../user/state/user'

import { useWorkBudget } from './useWorkBudget'

export const useDaysBudget = () => {
  const workBudget = useWorkBudget()
  const { weekends } = useUser()

  return toDaysBudget({
    ...workBudget,
    weekends,
  })
}
