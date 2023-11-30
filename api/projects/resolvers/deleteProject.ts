import { ApiResolver } from '@increaser/api-interface/ApiResolver'
import { assertUserId } from '../../auth/assertUserId'
import * as projectsDb from '@increaser/db/project'

export const deleteProject: ApiResolver<'deleteProject'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)

  await projectsDb.deleteProject(userId, id)
}
