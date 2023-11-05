import { addQueryParams } from '@increaser/utils/query/addQueryParams'
import { MutationResolvers } from '../../gql/schema'
import { generateAuthLinkToken } from '../helpers/generateAuthLinkToken'
import { assertEnvVar } from '../../shared/assertEnvVar'
import { sendLoginLinkEmail } from '@increaser/email/utils/sendLogInLinkEmail'

export const sendAuthLinkByEmail: MutationResolvers['sendAuthLinkByEmail'] =
  async (_: any, { input: { email } }): Promise<boolean> => {
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
