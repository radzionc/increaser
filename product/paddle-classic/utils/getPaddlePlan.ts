import { PaddleClassicSubscriptionPlan } from '../entities'

import { queryPaddle } from './queryPaddle'

export const getPaddlePlan = async (id: number) => {
  const [plan] = await queryPaddle<PaddleClassicSubscriptionPlan[]>(
    'subscription/plans',
    {
      plan: id,
    },
  )

  return plan
}
