import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { MutationResolvers } from '../../gql/schema'
import * as usersDb from '@increaser/db/user'

export const updateUser: MutationResolvers['updateUser'] = async (
  _,
  { input },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  await usersDb.updateUser(userId, input)

  return true
}
