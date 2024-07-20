import { assertUserId } from '../../auth/assertUserId'
import * as ideasDb from '@increaser/db/idea'
import { ApiResolver } from '../../resolvers/ApiResolver'

export const updateIdea: ApiResolver<'updateIdea'> = async ({
  input,
  context,
}) => {
  const userId = assertUserId(context)

  const { id, fields } = input

  const value = ideasDb.updateIdea(userId, id, fields)

  return value
}
