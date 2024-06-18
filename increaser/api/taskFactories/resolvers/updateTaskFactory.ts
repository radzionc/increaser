import { assertUserId } from '../../auth/assertUserId'
import * as taskFactoriesDB from '@increaser/db/taskFactory'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const updateTaskFactory: ApiResolver<'updateTaskFactory'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)

  const { id, fields } = input

  const taskFactory = taskFactoriesDB.updateTaskFactory(userId, id, fields)

  return taskFactory
}
