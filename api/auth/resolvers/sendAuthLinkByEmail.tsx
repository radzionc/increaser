import { addQueryParams } from '@increaser/utils/query/addQueryParams'
import { generateAuthLinkToken } from '../helpers/generateAuthLinkToken'
import { assertEnvVar } from '../../shared/assertEnvVar'
import { sendLoginLinkEmail } from '@increaser/email/utils/sendLogInLinkEmail'
import { ApiResolver } from '@increaser/api-interface/ApiResolver'

export const sendAuthLinkByEmail: ApiResolver<'sendAuthLinkByEmail'> = async ({
  input: { email },
}): Promise<boolean> => {
  const code = await generateAuthLinkToken(email)
  const loginUrl = addQueryParams(`${assertEnvVar('APP_URL')}/email-auth`, {
    code,
  })

  await sendLoginLinkEmail({
    loginUrl,
    email,
  })

  return true
}
