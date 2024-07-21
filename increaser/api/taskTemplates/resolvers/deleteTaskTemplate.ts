import { assertUserId } from '../../auth/assertUserId'
import * as taskTemplatesDb from '@increaser/db/taskTemplate'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const deleteTaskTemplate: ApiResolver<'deleteTaskTemplate'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)

  await taskTemplatesDb.deleteTaskTemplate(userId, id)
}
