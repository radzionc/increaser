import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { MutationResolvers } from '../../gql/schema'
import * as projectsDb from '@increaser/db/project'

export const deleteProject: MutationResolvers['deleteProject'] = async (
  _,
  { input: { id } },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  await projectsDb.deleteProject(userId, id)

  return true
}
