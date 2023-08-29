import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { removeLastSet as removeLastSetService } from '../services/removeLastSet'
import { MutationResolvers } from '../../gql/schema'

export const removeLastSet: MutationResolvers['removeLastSet'] = async (
  _: any,
  __: any,
  context: OperationContext,
): Promise<boolean> => {
  const userId = assertUserId(context)

  await removeLastSetService(userId)

  return true
}
