import { generateAuthLinkToken } from '../auth/helpers/generateAuthLinkToken'
import { sendLoginLinkEmail } from '@increaser/email/utils/sendLogInLinkEmail'
import { addQueryParams } from '@increaser/utils/query/addQueryParams'
import { getEnvVar } from '../getEnvVar'

const sendAuthEmail = async (email: string) => {
  const code = await generateAuthLinkToken(email)
  const loginUrl = addQueryParams(`${getEnvVar('APP_URL')}/email-auth`, {
    code,
  })
  await sendLoginLinkEmail({
    loginUrl,
    email,
  })
}

sendAuthEmail('geekrodion@gmail.com')
