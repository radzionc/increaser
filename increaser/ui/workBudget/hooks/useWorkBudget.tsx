import { WorkBudget } from '@increaser/entities/WorkBudget'
import { pick } from '@lib/utils/record/pick'
import { useAssertUserState } from '../../user/UserStateContext'

export const useWorkBudget = (): WorkBudget => {
  const user = useAssertUserState()

  return pick(user, ['weekendHours', 'workdayHours'])
}
