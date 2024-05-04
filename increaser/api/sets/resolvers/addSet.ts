import { getUser, updateUser } from '@increaser/db/user'
import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { order } from '@lib/utils/array/order'

export const addSet: ApiResolver<'addSet'> = async ({ input, context }) => {
  const userId = assertUserId(context)
  const { sets } = await getUser(userId, ['sets'])

  await updateUser(userId, {
    sets: order([...sets, input], (set) => set.start, 'asc'),
  })
}
