import { assertUserId } from '../../auth/assertUserId'
import { OperationContext } from '../../gql/OperationContext'
import { getId } from '@increaser/entities-utils/shared/getId'

import { defaultProjectProperties, Project } from '../Project'
import { MutationResolvers } from '../../gql/schema'
import { putProject } from '@increaser/db/project'

export const createProject: MutationResolvers['createProject'] = async (
  _,
  { input },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  const project: Project = {
    ...defaultProjectProperties,
    ...input,
    id: input.id || getId(),
  }

  await putProject(userId, project)

  return project
}
