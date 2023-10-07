import { sendEmail } from '../email'
import { render } from '@react-email/render'
import AuthEmail from '@increaser/email/emails/AuthEmail'
import { generateAuthLinkToken } from '../auth/helpers/generateAuthLinkToken'

const sendAuthEmail = async (email: string) => {
  const code = generateAuthLinkToken(email)
  const url = `https://app.increaser.org/email-auth?url=${code}`

  await sendEmail({
    email,
    body: render(<AuthEmail url={url} email={email} />, {
      pretty: true,
    }),
    subject: 'Log in to Increaser',
    source: `Login <noreply@increaser.org>`,
  })
}

sendAuthEmail('geekrodion@gmail.com')
// sendAuthEmail('nino.gogsadze17@gmail.com')
