import { pick } from '@lib/utils/record/pick'
import { WorkBudget } from '@product/entities/WorkBudget'
import { useUser } from '@product/ui/user/state/user'

export const useWorkBudget = (): WorkBudget => {
  const user = useUser()

  return pick(user, ['weekendHours', 'workdayHours'])
}
