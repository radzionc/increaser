import { assertUserId } from '../../auth/assertUserId'
import * as projectsDb from '@increaser/db/project'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const updateProject: ApiResolver<'updateProject'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)

  const { id, fields } = input

  return projectsDb.updateProject(userId, id, fields)
}
