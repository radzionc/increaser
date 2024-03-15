import { getUser } from '@increaser/db/user'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { getUserProfile } from '@increaser/entities-utils/scoreboard/getUserProfile'

export const userProfile: ApiResolver<'userProfile'> = async ({
  input: { id },
}) => {
  const user = await getUser(id, ['name', 'country', 'isAnonymous'])

  return getUserProfile(user)
}
