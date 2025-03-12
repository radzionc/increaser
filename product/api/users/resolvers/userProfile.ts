import { getUser } from '@product/db/user'
import { getUserProfile } from '@product/entities-utils/scoreboard/getUserProfile'

import { ApiResolver } from '../../resolvers/ApiResolver'

export const userProfile: ApiResolver<'userProfile'> = async ({
  input: { id },
}) => {
  const user = await getUser(id, ['name', 'country', 'isAnonymous'])

  return getUserProfile(user)
}
