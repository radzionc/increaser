import { assertUserId } from '../../auth/assertUserId'
import * as projectsDb from '@increaser/db/project'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const deleteProject: ApiResolver<'deleteProject'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)

  await projectsDb.deleteProject(userId, id)
}
