import { sendEmailConfirmationLink } from '../email'
import { generateAuthLinkToken } from '../helpers/generateAuthLinkToken'

interface Input {
  email: string
  destination: string
}

export const sendAuthLinkByEmail = async (
  _: any,
  { input: { email, destination } }: { input: Input },
): Promise<boolean> => {
  const token = generateAuthLinkToken(email)

  await sendEmailConfirmationLink(
    email,
    `https://increaser.org/email-auth?token=${token}&destination=${destination}`,
  )

  return true
}
