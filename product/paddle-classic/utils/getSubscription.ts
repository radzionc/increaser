import { PaddleClassicUser } from '../entities'

import { getPaddlePlan } from './getPaddlePlan'
import { queryPaddle } from './queryPaddle'
import { toSubscription } from './toSubscription'

export const getSubscription = async (subscriptionId: string) => {
  const [user] = await queryPaddle<PaddleClassicUser[]>('subscription/users', {
    subscription_id: subscriptionId,
    results_per_page: 1,
  })

  const plan = await getPaddlePlan(user.plan_id)

  return toSubscription(user, plan)
}
