import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../graphql/OperationContext'
import * as usersDb from '../../users/db'

import { WeekTimeAllocation } from '../WeekTimeAllocation'

interface Input {
  allocation: WeekTimeAllocation
}

export const updateWeekTimeAllocation = async (
  _: any,
  { input: { allocation } }: { input: Input },
  context: OperationContext,
): Promise<WeekTimeAllocation> => {
  const userId = assertUserId(context)

  await usersDb.updateUser(userId, { weekTimeAllocation: allocation })

  return allocation
}
