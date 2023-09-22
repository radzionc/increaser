import { addQueryParams } from '@increaser/utils/addQueryParams'
import { MutationResolvers } from '../../gql/schema'
import { sendEmailConfirmationLink } from '../email'
import { generateAuthLinkToken } from '../helpers/generateAuthLinkToken'

export const sendAuthLinkByEmail: MutationResolvers['sendAuthLinkByEmail'] =
  async (_: any, { input: { email } }): Promise<boolean> => {
    const code = generateAuthLinkToken(email)

    await sendEmailConfirmationLink(
      email,
      addQueryParams('https://app.increaser.org/email-auth', { code }),
    )

    return true
  }
