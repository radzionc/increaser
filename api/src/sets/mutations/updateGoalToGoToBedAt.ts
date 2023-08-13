import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../graphql/OperationContext'
import * as usersDb from '../../users/db'

interface Input {
  goalToGoToBedAt: number
}

export const updateGoalToGoToBedAt = async (
  _: any,
  { input: { goalToGoToBedAt } }: { input: Input },
  context: OperationContext,
): Promise<number> => {
  const userId = assertUserId(context)

  await usersDb.updateUser(userId, { goalToGoToBedAt })

  return goalToGoToBedAt
}
