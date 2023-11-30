import { ApiResolver } from '@increaser/api-interface/ApiResolver'
import { assertUserId } from '../../auth/assertUserId'
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
