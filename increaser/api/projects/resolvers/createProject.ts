import { assertUserId } from '../../auth/assertUserId'
import { getId } from '@increaser/entities-utils/shared/getId'

import { putProject } from '@increaser/db/project'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { Project, projectDefaultFields } from '@increaser/entities/Project'

export const createProject: ApiResolver<'createProject'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)

  const project: Project = {
    ...projectDefaultFields,
    ...input,
    id: input.id || getId(),
  }

  await putProject(userId, project)

  return project
}
