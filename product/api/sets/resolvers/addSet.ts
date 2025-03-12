import { getUser, updateUser } from '@product/db/user'
import { addSet as add } from '@product/entities-utils/set/addSet'

import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const addSet: ApiResolver<'addSet'> = async ({ input, context }) => {
  const userId = assertUserId(context)
  const { sets } = await getUser(userId, ['sets'])

  await updateUser(userId, {
    sets: add({ sets, value: input }),
  })
}
