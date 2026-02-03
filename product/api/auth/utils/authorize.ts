import { CountryCode } from '@lib/countries'
import { ApiError } from '@product/api-interface/ApiError'
import { getUserByEmail } from '@product/db/user'
import { AuthSession } from '@product/entities/AuthSession'

import { AuthenticationResult } from './AuthenticationResult'
import { getAuthSession } from './getAuthSession'

interface AuthorizeParams extends AuthenticationResult {
  timeZone: number
  country?: CountryCode
}

export const authorize = async ({
  email,
}: AuthorizeParams): Promise<AuthSession> => {
  const existingUser = await getUserByEmail(email, ['id'])
  if (existingUser) {
    return {
      ...(await getAuthSession(existingUser.id)),
      isFirst: false,
    }
  }

  throw new ApiError(
    'registrationClosed',
    'Increaser is no longer available for registration.',
  )
}
