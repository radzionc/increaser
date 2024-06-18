import { assertUserId } from '../../auth/assertUserId'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { putTaskFactory } from '@increaser/db/taskFactory'

export const createTaskFactory: ApiResolver<'createTaskFactory'> = async ({
  input,
  context,
}): Promise<TaskFactory> => {
  const userId = assertUserId(context)

  await putTaskFactory(userId, input)

  return input
}
