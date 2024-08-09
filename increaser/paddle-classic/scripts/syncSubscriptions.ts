import { getUserByEmail, updateUser } from '@increaser/db/user'
import { PaddleClassicUser } from '../entities'
import { queryPaddle } from '../utils/queryPaddle'
import { getPaddlePlan } from '../utils/getPaddlePlan'
import { toSubscription } from '../utils/toSubscription'

const syncSubscriptions = async (planId: number) => {
  console.log(`Syncing subscriptions for plan ${planId}`)
  const users = await queryPaddle<PaddleClassicUser[]>('subscription/users', {
    plan_id: planId,
    results_per_page: 200,
  })

  console.log(`Found ${users.length} users`)

  const plan = await getPaddlePlan(planId)

  await Promise.all(
    users.map(async (paddleUser) => {
      const user = await getUserByEmail(paddleUser.user_email, ['id'])
      if (!user) {
        throw new Error(`User with email ${paddleUser.user_email} not found`)
      }

      const subscription = toSubscription(paddleUser, plan)

      updateUser(user.id, {
        subscription,
      })
    }),
  )
}

const planId = Number(process.argv[2])

syncSubscriptions(planId)
