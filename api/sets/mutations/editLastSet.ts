import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { addSet } from '../services/addSet'
import { Set } from '../../users/User'
import { removeLastSet } from '../services/removeLastSet'
import { MutationResolvers } from '../../gql/schema'

export const editLastSet: MutationResolvers['editLastSet'] = async (
  _: any,
  { set }: { set: Set },
  context: OperationContext,
): Promise<boolean> => {
  const userId = assertUserId(context)

  await removeLastSet(userId)
  await addSet(userId, set)

  return true
}
