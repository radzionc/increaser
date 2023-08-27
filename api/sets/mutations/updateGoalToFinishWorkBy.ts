import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import * as usersDb from '../../users/db'

interface Input {
  goalToFinishWorkBy: number
}

export const updateGoalToFinishWorkBy = async (
  _: any,
  { input: { goalToFinishWorkBy } }: { input: Input },
  context: OperationContext,
): Promise<number> => {
  const userId = assertUserId(context)

  await usersDb.updateUser(userId, { goalToFinishWorkBy })

  return goalToFinishWorkBy
}
