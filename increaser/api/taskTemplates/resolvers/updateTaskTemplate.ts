import { assertUserId } from '../../auth/assertUserId'
import * as taskTemplatesDB from '@increaser/db/taskTemplate'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const updateTaskTemplate: ApiResolver<'updateTaskTemplate'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)

  const { id, fields } = input

  const taskTemplate = taskTemplatesDB.updateTaskTemplate(userId, id, fields)

  return taskTemplate
}
