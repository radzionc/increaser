import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { addSet as addSetService } from '../services/addSet'

export const addSet: ApiResolver<'addSet'> = async ({ input, context }) => {
  const userId = assertUserId(context)

  await addSetService(userId, input)
}
