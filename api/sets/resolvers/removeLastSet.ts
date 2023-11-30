import { ApiResolver } from '@increaser/api-interface/ApiResolver'
import { assertUserId } from '../../auth/assertUserId'
import { removeLastSet as removeLastSetService } from '../services/removeLastSet'

export const removeLastSet: ApiResolver<'removeLastSet'> = async ({
  context,
}) => {
  const userId = assertUserId(context)

  await removeLastSetService(userId)
}
