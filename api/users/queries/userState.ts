import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { organizeTasks } from '../../tasks/services/organizeTasks'
import { organizeWeeks } from '@increaser/data-services/sets/organizeWeeks'
import { organizeMonths } from '@increaser/data-services/sets/organizeMonths'
import { QueryResolvers } from '../../gql/schema'
import { getUserById, updateUser } from '@increaser/db/user'

export const userState: QueryResolvers['userState'] = async (
  _,
  { input: { timeZone } },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  await updateUser(userId, { timeZone })

  await organizeWeeks(userId)
  await organizeMonths(userId)

  await organizeTasks(userId)

  const user = await getUserById(userId)

  return {
    ...user,
    habits: Object.values(user.habits),
  }
}
