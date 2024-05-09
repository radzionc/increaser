import { getUser, updateUser } from '@increaser/db/user'
import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { addSet as add } from '@increaser/entities-utils/set/addSet'

export const addSet: ApiResolver<'addSet'> = async ({ input, context }) => {
  const userId = assertUserId(context)
  const { sets } = await getUser(userId, ['sets'])

  await updateUser(userId, {
    sets: add({ sets, value: input }),
  })
}
