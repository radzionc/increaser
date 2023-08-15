import { sendEmailConfirmationLink } from '../email'
import { generateAuthLinkToken } from '../helpers/generateAuthLinkToken'

interface Input {
  email: string
}

export const sendAuthLinkByEmail = async (
  _: any,
  { input: { email } }: { input: Input },
): Promise<boolean> => {
  const token = generateAuthLinkToken(email)

  await sendEmailConfirmationLink(
    email,
    `https://increaser.org/email-auth?token=${token}`,
  )

  return true
}
