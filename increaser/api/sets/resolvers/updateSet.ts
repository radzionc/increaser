import { getUser, updateUser } from '@increaser/db/user'
import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { updateSet as update } from '@increaser/entities-utils/set/updateSet'

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
