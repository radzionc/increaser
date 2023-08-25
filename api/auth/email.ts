import { getHTMLTemplate, fillHtmlTemplate, sendEmail } from '../email'

export const sendEmailConfirmationLink = async (
  email: string,
  authLink: string,
) => {
  const html = getHTMLTemplate('auth')

  await sendEmail({
    email,
    body: fillHtmlTemplate(html, {
      'auth-link': authLink,
      email,
    }),
    subject: 'Log in to Increaser',
    source: `Login <noreply@increaser.org>`,
  })
}
