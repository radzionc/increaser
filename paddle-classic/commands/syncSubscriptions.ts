import { getUserByEmail, updateUser } from '@increaser/db/user'
import { PaddleClassicSubscriptionPlan, PaddleClassicUser } from '../entities'
import { queryPaddle } from '../utils/queryPaddle'
import { toSubscription } from '../utils/toSubscription'

const syncSubscriptions = async () => {
  const plans =
    await queryPaddle<PaddleClassicSubscriptionPlan[]>('subscription/plans')

  const users = await queryPaddle<PaddleClassicUser[]>('subscription/users', {
    state: 'cancelled',
  })

  await Promise.all(
    users.map(async (paddleUser) => {
      const subscription = toSubscription(paddleUser, plans)
      const user = await getUserByEmail(paddleUser.user_email, ['id'])
      if (!user) {
        throw new Error(`User with email ${paddleUser.user_email} not found`)
      }

      updateUser(user.id, {
        subscription,
      })
    }),
  )
}

syncSubscriptions()
