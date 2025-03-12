import { getPickParams } from '@lib/dynamodb/getPickParams'
import { totalScan } from '@lib/dynamodb/totalScan'
import { sleep } from '@lib/utils/sleep'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { tableName } from '@product/db/tableName'
import { sendEmail } from '@product/email/utils/sendEmail'
import { User } from '@product/entities/User'

const campaignStartedAt = Date.now() - convertDuration(1, 'd', 'ms')

const body = `
<p>Hey there,</p>

<p>I hope this email finds you well!</p>

<p>I'm thrilled to share some exciting news with you. We've made significant improvements to Increaser, and I'm eager for you to experience the latest features and enhancements.</p>

<p>Here's what's new:</p>

<ul>
  <li><strong>Deep Work Timer:</strong> Enhanced focus sessions with customizable breaks.</li>
  <li><strong>Advanced Time Tracking:</strong> Detailed reports and analytics to track your productivity.</li>
  <li><strong>Improved Task Management:</strong> Organize and prioritize your tasks effortlessly.</li>
  <li><strong>Work and Project Budgeting:</strong> Set and track your work hours across multiple projects with new goal-setting options.</li>
  <li><strong>Habit Tracking:</strong> Maintain productive habits with a robust tracking system.</li>
  <li><strong>Scheduling:</strong> Plan your daily schedule visually with ease.</li>
</ul>

<p>To see all the updates in action, we've launched Increaser on ProductHunt. Your support and feedback have been invaluable, and I would love for you to check out our ProductHunt page.</p>

<p><a href="https://www.producthunt.com/posts/increaser-3">Check out Increaser on ProductHunt</a></p>

<p>If you find the updates helpful, please consider upvoting and leaving a comment. Your feedback and support will help us reach more users who can benefit from Increaser.</p>

<p>Thank you for being part of our journey. I look forward to hearing your thoughts on the new improvements.</p>

<p>Best regards,<br>Radzion</p>
`

const productHunt = async () => {
  const users = await totalScan<
    Pick<User, 'id' | 'ignoreEmails' | 'registrationDate' | 'email'>
  >({
    TableName: tableName.users,
    ...getPickParams(['id', 'ignoreEmails', 'registrationDate', 'email']),
  })

  const targetUsers = users.filter(
    (user) => !user.ignoreEmails && user.registrationDate < campaignStartedAt,
  )

  for (const { email } of targetUsers) {
    await sendEmail({
      email,
      body,
      subject: 'Exciting Updates in Increaser - Check Them Out on ProductHunt!',
      source: 'Radzion <radzion@increaser.org>',
    })
    await sleep(convertDuration(1 / 14, 's', 'ms'))
  }
}

productHunt()
