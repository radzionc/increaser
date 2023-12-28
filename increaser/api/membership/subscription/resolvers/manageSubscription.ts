import { queryPaddle } from '@increaser/paddle-classic/utils/queryPaddle'
import { assertUserId } from '../../../auth/assertUserId'
import { PaddleClassicUser } from '@increaser/paddle-classic/entities'
import { getUser } from '@increaser/db/user'
import { ApiResolver } from '../../../resolvers/ApiResolver'
import { ApiError } from '@increaser/api-interface/ApiError'

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
