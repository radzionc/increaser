import { assertUserId } from '../../auth/assertUserId'
import { organizeTasks } from '../../tasks/services/organizeTasks'
import { getUser, updateUser } from '@increaser/db/user'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { organizeSets } from '@increaser/data-services/sets/organizeSets'
import { runTaskFactories } from '../../taskFactories/services/runTaskFactories'

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
