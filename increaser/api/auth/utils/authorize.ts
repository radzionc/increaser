import { getUserByEmail, putUser } from '@increaser/db/user'
import { AuthenticationResult } from './AuthenticationResult'
import { getAuthSession } from './getAuthSession'
import { getUserInitialFields } from '@increaser/entities-utils/user/getUserInitialFields'
import { AuthSession } from '@increaser/entities/AuthSession'
import { CountryCode } from '@lib/countries'
import { putEmail } from '@increaser/db/email'

interface AuthorizeParams extends AuthenticationResult {
  timeZone: number
  country?: CountryCode
}

export const authorize = async ({
  email,
  name,
  country,
  timeZone,
}: AuthorizeParams): Promise<AuthSession> => {
  const existingUser = await getUserByEmail(email, ['id'])
  if (existingUser) {
    return {
      ...(await getAuthSession(existingUser.id)),
      isFirst: false,
    }
  }

  const newUser = getUserInitialFields({
    email,
    name,
    country,
    timeZone,
  })

  await putUser(newUser)
  await putEmail({ id: email })

  const session = await getAuthSession(newUser.id)

  return {
    ...session,
    isFirst: true,
  }
}
