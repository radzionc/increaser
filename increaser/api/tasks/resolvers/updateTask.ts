import { assertUserId } from '../../auth/assertUserId'
import * as tasksDB from '@increaser/db/task'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const updateTask: ApiResolver<'updateTask'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)

  const { id, fields } = input

  const task = tasksDB.updateTask(userId, id, fields)

  return task
}
