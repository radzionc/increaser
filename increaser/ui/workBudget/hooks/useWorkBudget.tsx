import { WorkBudget } from '@increaser/entities/WorkBudget'
import { pick } from '@lib/utils/record/pick'
import { useUser } from '@increaser/ui/user/state/user'

export const useWorkBudget = (): WorkBudget => {
  const user = useUser()

  return pick(user, ['weekendHours', 'workdayHours'])
}
