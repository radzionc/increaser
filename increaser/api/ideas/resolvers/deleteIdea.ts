import { assertUserId } from '../../auth/assertUserId'
import * as ideasDb from '@increaser/db/idea'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const deleteIdea: ApiResolver<'deleteIdea'> = async ({
  input: { id },
  context,
}) => {
  const userId = assertUserId(context)

  await ideasDb.deleteIdea(userId, id)
}
