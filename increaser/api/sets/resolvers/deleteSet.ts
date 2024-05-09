import { getUser, updateUser } from '@increaser/db/user'
import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { deleteSet as remove } from '@increaser/entities-utils/set/deleteSet'

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
