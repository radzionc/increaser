import { toDaysBudget } from '@increaser/entities-utils/workBudget/toDaysBudget'
import { useWorkBudget } from './useWorkBudget'
import { useUser } from '../../user/state/user'

export const useDaysBudget = () => {
  const workBudget = useWorkBudget()
  const { weekends } = useUser()

  return toDaysBudget({
    ...workBudget,
    weekends,
  })
}
