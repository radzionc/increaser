import { assertUserId } from '../../auth/assertUserId'
import * as taskFactoriesDb from '@increaser/db/taskFactory'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { syncTaskFactoriesDependantFields } from '@increaser/data-services/taskFactories/syncTaskFactoriesDependantFields'

export const deleteTaskFactory: ApiResolver<'deleteTaskFactory'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)

  await taskFactoriesDb.deleteTaskFactory(userId, id)

  await syncTaskFactoriesDependantFields(userId)
}
