import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../graphql/OperationContext'
import * as usersDb from '../../users/db'

interface Input {
  goalToStartWorkAt: number
}

export const updateGoalToStartWorkAt = async (
  _: any,
  { input: { goalToStartWorkAt } }: { input: Input },
  context: OperationContext,
): Promise<number> => {
  const userId = assertUserId(context)

  await usersDb.updateUser(userId, { goalToStartWorkAt })

  return goalToStartWorkAt
}
