import { getUser, updateUser } from '@product/db/user'
import { deleteSet as remove } from '@product/entities-utils/set/deleteSet'

import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const deleteSet: ApiResolver<'deleteSet'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)
  const { sets } = await getUser(userId, ['sets'])

  await updateUser(userId, {
    sets: remove({ sets, value: input }),
  })
}
