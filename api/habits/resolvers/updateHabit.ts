import { assertUserId } from '../../auth/assertUserId'
import * as habitsDB from '@increaser/db/habit'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const updateHabit: ApiResolver<'updateHabit'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)

  const { id, fields } = input

  const habit = habitsDB.updateHabit(userId, id, fields)

  return habit
}
