import { assertUserId } from '../../auth/assertUserId'
import { getId } from '@increaser/entities-utils/shared/getId'

import { defaultProjectProperties, Project } from '../Project'
import { putProject } from '@increaser/db/project'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const createProject: ApiResolver<'createProject'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)

  const project: Project = {
    ...defaultProjectProperties,
    ...input,
    id: input.id || getId(),
  }

  await putProject(userId, project)

  return project
}
