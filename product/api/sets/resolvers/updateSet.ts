import { getUser, updateUser } from '@product/db/user'
import { updateSet as update } from '@product/entities-utils/set/updateSet'

import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const updateSet: ApiResolver<'updateSet'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)
  const { sets } = await getUser(userId, ['sets'])

  await updateUser(userId, {
    sets: update({
      sets,
      old: input.old,
      new: input.new,
    }),
  })
}
