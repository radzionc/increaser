import { sendEmailConfirmationLink } from '../auth/email'
import { generateAuthLinkToken } from '../auth/helpers/generateAuthLinkToken'

const sendAuthEmail = (email: string) => {
  const token = generateAuthLinkToken(email)

  return sendEmailConfirmationLink(
    email,
    `https://app.increaser.org/email-auth?token=${token}`,
  )
}

sendAuthEmail('geekrodion@gmail.com')
