import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { removeLastSet as removeLastSetService } from '../services/removeLastSet'

export const removeLastSet: ApiResolver<'removeLastSet'> = async ({
  context,
}) => {
  const userId = assertUserId(context)

  await removeLastSetService(userId)
}
