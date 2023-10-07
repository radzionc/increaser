import { addQueryParams } from '@increaser/utils/addQueryParams'
import { MutationResolvers } from '../../gql/schema'
import { generateAuthLinkToken } from '../helpers/generateAuthLinkToken'
import { sendEmail } from '../../email'
import { render } from '@react-email/render'
import AuthEmail from '@increaser/email/emails/AuthEmail'
import { productName } from '@increaser/entities'
import { assertEnvVar } from '../../shared/assertEnvVar'

export const sendAuthLinkByEmail: MutationResolvers['sendAuthLinkByEmail'] =
  async (_: any, { input: { email } }): Promise<boolean> => {
    const code = await generateAuthLinkToken(email)
    const url = addQueryParams(`${assertEnvVar('APP_URL')}/email-auth`, {
      code,
    })

    await sendEmail({
      email,
      body: render(<AuthEmail url={url} email={email} />, {
        pretty: true,
      }),
      subject: `Log in to ${productName}`,
      source: `Log in <noreply@${assertEnvVar('EMAIL_DOMAIN')}>`,
    })

    return true
  }
