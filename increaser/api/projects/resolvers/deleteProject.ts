import { assertUserId } from '../../auth/assertUserId'
import * as projectsDb from '@increaser/db/project'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { couldProjectBeDeleted } from '@increaser/entities-utils/project/couldProjectBeDeleted'
import { syncProjectsDependantFields } from '@increaser/data-services/projects/syncProjectsDependantFields'

export const deleteProject: ApiResolver<'deleteProject'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)

  if (!couldProjectBeDeleted(id)) {
    throw new Error(`A project with id ${id} could not be deleted.`)
  }

  await projectsDb.deleteProject(userId, id)

  await syncProjectsDependantFields(userId)
}
