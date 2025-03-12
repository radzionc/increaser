import { ApiError } from '@product/api-interface/ApiError'
import { getUser } from '@product/db/user'
import { PaddleClassicUser } from '@product/paddle-classic/entities'
import { queryPaddle } from '@product/paddle-classic/utils/queryPaddle'

import { assertUserId } from '../../../auth/assertUserId'
import { ApiResolver } from '../../../resolvers/ApiResolver'

export const manageSubscription: ApiResolver<'manageSubscription'> = async ({
  context,
}) => {
  const userId = assertUserId(context)
  const { subscription } = await getUser(userId, ['subscription'])
  if (!subscription) {
    throw new ApiError('invalidInput', 'User has no subscription')
  }

  const [user] = await queryPaddle<PaddleClassicUser[]>('subscription/users', {
    subscription_id: subscription.id,
  })

  return {
    cancelUrl: user.cancel_url,
    updateUrl: user.update_url,
  }
}
