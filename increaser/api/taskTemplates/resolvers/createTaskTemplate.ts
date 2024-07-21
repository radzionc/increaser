import { assertUserId } from '../../auth/assertUserId'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { putTaskTemplate } from '@increaser/db/taskTemplate'

export const createTaskTemplate: ApiResolver<'createTaskTemplate'> = async ({
  input,
  context,
}): Promise<TaskTemplate> => {
  const userId = assertUserId(context)

  await putTaskTemplate(userId, input)

  return input
}
