import { getUser, updateUser } from '@product/db/user'
import { addSets as add } from '@product/entities-utils/set/addSets'

import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const addSets: ApiResolver<'addSets'> = async ({ input, context }) => {
  const userId = assertUserId(context)
  const { sets: prev } = await getUser(userId, ['sets'])

  const sets = add({ prev, value: input })

  await updateUser(userId, {
    sets,
  })

  return sets
}
