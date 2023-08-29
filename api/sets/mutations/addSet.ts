import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { addSet as addSetService } from '../services/addSet'
import { MutationResolvers } from '../../gql/schema'

export const addSet: MutationResolvers['addSet'] = async (
  _,
  { set },
  context: OperationContext,
): Promise<boolean> => {
  const userId = assertUserId(context)

  await addSetService(userId, set)

  return true
}
