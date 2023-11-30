import { ApiResolver } from '@increaser/api-interface/ApiResolver'
import { assertUserId } from '../../auth/assertUserId'
import { addSet as addSetService } from '../services/addSet'

export const addSet: ApiResolver<'addSet'> = async ({ input, context }) => {
  const userId = assertUserId(context)

  await addSetService(userId, input)
}
