import { assertUserId } from '../../auth/assertUserId'
import * as taskFactoriesDb from '@increaser/db/taskTemplate'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { syncTaskFactoriesDependantFields } from '@increaser/data-services/taskFactories/syncTaskFactoriesDependantFields'

export const deleteTaskTemplate: ApiResolver<'deleteTaskTemplate'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)

  await taskFactoriesDb.deleteTaskTemplate(userId, id)

  await syncTaskFactoriesDependantFields(userId)
}
