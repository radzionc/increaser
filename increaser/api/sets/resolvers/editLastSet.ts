import { getUser, updateUser } from '@increaser/db/user'
import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { order } from '@lib/utils/array/order'

export const editLastSet: ApiResolver<'editLastSet'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)

  const { sets } = await getUser(userId, ['sets'])

  await updateUser(userId, {
    sets: order([...sets.slice(0, -1), input], (set) => set.start, 'asc'),
  })
}
