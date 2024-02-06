import { assertUserId } from '../../auth/assertUserId'
import { putTask } from '@increaser/db/task'
import { Task } from '@increaser/entities/Task'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const createTask: ApiResolver<'createTask'> = async ({
  input,
  context,
}): Promise<Task> => {
  const userId = assertUserId(context)

  await putTask(userId, {
    ...input,
    order: input.order ?? 0,
  })

  return input
}
