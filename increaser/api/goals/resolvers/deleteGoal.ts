import { assertUserId } from '../../auth/assertUserId'
import * as goalsDb from '@increaser/db/goal'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const deleteGoal: ApiResolver<'deleteGoal'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)

  await goalsDb.deleteGoal(userId, id)
}
