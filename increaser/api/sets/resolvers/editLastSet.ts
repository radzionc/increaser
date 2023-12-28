import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { addSet } from '../services/addSet'
import { removeLastSet } from '../services/removeLastSet'

export const editLastSet: ApiResolver<'editLastSet'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)

  await removeLastSet(userId)
  await addSet(userId, input)
}
