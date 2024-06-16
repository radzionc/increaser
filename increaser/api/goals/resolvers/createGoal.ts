import { assertUserId } from '../../auth/assertUserId'
import * as goalsDb from '@increaser/db/goal'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { Goal } from '@increaser/entities/Goal'

export const createGoal: ApiResolver<'createGoal'> = async ({
  input,
  context,
}): Promise<Goal> => {
  const userId = assertUserId(context)

  await goalsDb.putGoal(userId, input)

  return input
}
