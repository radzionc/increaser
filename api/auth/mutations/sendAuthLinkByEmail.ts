import { MutationResolvers } from '../../gql/schema'
import { sendEmailConfirmationLink } from '../email'
import { generateAuthLinkToken } from '../helpers/generateAuthLinkToken'

export const sendAuthLinkByEmail: MutationResolvers['sendAuthLinkByEmail'] =
  async (_: any, { input: { email } }): Promise<boolean> => {
    const token = generateAuthLinkToken(email)

    await sendEmailConfirmationLink(
      email,
      `https://app.increaser.org/email-auth?token=${token}`,
    )

    return true
  }
