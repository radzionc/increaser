import { getUserByEmail, putUser } from '@increaser/db/user'
import { AuthSession } from '../../gql/schema'
import { AuthenticationResult } from './AuthenticationResult'
import { getAuthSession } from './getAuthSession'
import { getUserInitialFields } from '@increaser/entities-utils/user/getUserInitialFields'

interface AuthorizeParams extends AuthenticationResult {
  timeZone: number
  country?: string
}

export const authorize = async ({
  email,
  name,
  country,
  timeZone,
}: AuthorizeParams): Promise<AuthSession> => {
  const existingUser = await getUserByEmail(email, ['id'])
  if (existingUser) {
    return getAuthSession(existingUser.id)
  }

  const newUser = getUserInitialFields({
    email,
    name,
    country,
    timeZone,
  })

  await putUser(newUser)

  const session = await getAuthSession(newUser.id)

  return {
    ...session,
    isFirst: true,
  }
}
