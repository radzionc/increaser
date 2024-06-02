import { assertUserId } from '../../auth/assertUserId'
import * as goalsDb from '@increaser/db/goal'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const updateGoal: ApiResolver<'updateGoal'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)

  const { id, fields } = input

  const value = goalsDb.updateGoal(userId, id, fields)

  return value
}
