import {
  deleteInactiveAccountAfter,
  notifyInactiveAccountAfter,
  productName,
} from '@increaser/config'
import { getEnvVar } from '../api/getEnvVar'

import { sendEmail } from '@increaser/email/utils/sendEmail'

type NotifyAboutAccountDeletionParams = {
  email: string
}

export const notifyAboutAccountDeletion = async ({
  email,
}: NotifyAboutAccountDeletionParams) => {
  const appUrl = getEnvVar('APP_URL')

  const body = `
  <p>Dear User,</p>
  <p>We hope this message finds you well. We are writing to inform you that your ${productName} account has been inactive for ${notifyInactiveAccountAfter} days. As per our policy, accounts that remain inactive for more than ${deleteInactiveAccountAfter} days are subject to deletion.</p>
  <p>To avoid having your account deleted, please visit the app within the next ${
    deleteInactiveAccountAfter - notifyInactiveAccountAfter
  } days:</p>
  <p><a href="${appUrl}">${appUrl}</a></p>
  <p>If you have any questions or need further assistance, feel free to contact our support team.</p>
  <p>Best regards,<br>The ${productName} Team</p>
`

  await sendEmail({
    email,
    body,
    subject: `Important: Your ${productName} Account is Scheduled for Deletion`,
    source: 'Increaser <noreply@increaser.org>',
  })
}
