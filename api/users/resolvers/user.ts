import { assertUserId } from '../../auth/assertUserId'
import { organizeTasks } from '../../tasks/services/organizeTasks'
import { organizeWeeks } from '@increaser/data-services/sets/organizeWeeks'
import { organizeMonths } from '@increaser/data-services/sets/organizeMonths'
import { getUser, updateUser } from '@increaser/db/user'
import { ApiResolver } from '@increaser/api-interface/ApiResolver'

export const user: ApiResolver<'user'> = async ({
  input: { timeZone },
  context,
}) => {
  const userId = assertUserId(context)

  await updateUser(userId, { timeZone })

  await organizeWeeks(userId)
  await organizeMonths(userId)

  await organizeTasks(userId)

  return getUser(userId)
}
