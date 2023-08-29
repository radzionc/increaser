import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { MutationResolvers } from '../../gql/schema'
import * as projectsDb from '@increaser/db/project'

export const updateProject: MutationResolvers['updateProject'] = async (
  _,
  { input },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  const { id, ...fields } = input

  const project = projectsDb.updateProject(userId, id, fields)

  return project
}
