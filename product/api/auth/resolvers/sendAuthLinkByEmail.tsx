import { addQueryParams } from '@lib/utils/query/addQueryParams'
import { ApiError } from '@product/api-interface/ApiError'
import { getUserByEmail } from '@product/db/user'
import { sendLoginLinkEmail } from '@product/email/utils/sendLogInLinkEmail'

import { getEnvVar } from '../../getEnvVar'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { generateAuthLinkToken } from '../helpers/generateAuthLinkToken'

export const sendAuthLinkByEmail: ApiResolver<'sendAuthLinkByEmail'> = async ({
  input: { email },
}) => {
  const existingUser = await getUserByEmail(email, ['id'])
  if (!existingUser) {
    throw new ApiError(
      'registrationClosed',
      'Increaser is no longer available for registration.',
    )
  }

  const code = await generateAuthLinkToken(email)
  const loginUrl = addQueryParams(`${getEnvVar('APP_URL')}/email-auth`, {
    code,
  })

  await sendLoginLinkEmail({
    loginUrl,
    email,
  })
}
