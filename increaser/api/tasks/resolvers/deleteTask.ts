import { assertUserId } from '../../auth/assertUserId'
import * as tasksDb from '@increaser/db/task'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const deleteTask: ApiResolver<'deleteTask'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)

  await tasksDb.deleteTask(userId, id)
}
