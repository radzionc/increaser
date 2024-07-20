import { assertUserId } from '../../auth/assertUserId'
import * as ideasDb from '@increaser/db/idea'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { Idea } from '@increaser/entities/Idea'

export const createIdea: ApiResolver<'createIdea'> = async ({
  input,
  context,
}): Promise<Idea> => {
  const userId = assertUserId(context)

  await ideasDb.putIdea(userId, input)

  return input
}
