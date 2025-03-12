import { organizeSets } from '@product/data-services/sets/organizeSets'
import { getUser, updateUser } from '@product/db/user'

import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { runTaskFactories } from '../../taskFactories/services/runTaskFactories'
import { organizeTasks } from '../../tasks/services/organizeTasks'

export const user: ApiResolver<'user'> = async ({
  input: { timeZone },
  context,
}) => {
  const userId = assertUserId(context)

  await updateUser(userId, { timeZone, lastVisitAt: Date.now() })

  await organizeSets(userId)

  await organizeTasks(userId)

  await runTaskFactories(userId)

  return getUser(userId)
}
