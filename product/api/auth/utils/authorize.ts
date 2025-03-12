import { CountryCode } from '@lib/countries'
import { asyncAttempt } from '@lib/utils/promise/asyncAttempt'
import { putEmail } from '@product/db/email'
import { getUserByEmail, putUser } from '@product/db/user'
import { AuthSession } from '@product/entities/AuthSession'
import { getUserInitialFields } from '@product/entities-utils/user/getUserInitialFields'

import { AuthenticationResult } from './AuthenticationResult'
import { getAuthSession } from './getAuthSession'

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
  await asyncAttempt(() => putEmail({ id: email }), undefined)

  const session = await getAuthSession(newUser.id)

  return {
    ...session,
    isFirst: true,
  }
}
