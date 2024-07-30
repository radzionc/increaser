import { getUser, updateUser } from '@increaser/db/user'
import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { addSets as add } from '@increaser/entities-utils/set/addSets'

export const addSets: ApiResolver<'addSets'> = async ({ input, context }) => {
  const userId = assertUserId(context)
  const { sets } = await getUser(userId, ['sets'])

  await updateUser(userId, {
    sets: add({ prev: sets, value: input }),
  })
}
