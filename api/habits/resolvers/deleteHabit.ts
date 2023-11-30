import { ApiResolver } from '@increaser/api-interface/ApiResolver'
import { assertUserId } from '../../auth/assertUserId'
import * as habitsDb from '@increaser/db/habit'

export const deleteHabit: ApiResolver<'deleteHabit'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)

  await habitsDb.deleteHabit(userId, id)
}
