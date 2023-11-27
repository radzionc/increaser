import { queryPaddle } from '@increaser/paddle-classic/utils/queryPaddle'
import { assertUserId } from '../../../auth/assertUserId'
import { OperationContext } from '../../../gql/OperationContext'
import { QueryResolvers } from '../../../gql/schema'
import { PaddleClassicUser } from '@increaser/paddle-classic/entities'
import { getUser } from '@increaser/db/user'

export const manageSubscription: QueryResolvers<OperationContext>['manageSubscription'] =
  async (_, __, context) => {
    const userId = assertUserId(context)
    const { subscription } = await getUser(userId, ['subscription'])
    if (!subscription) {
      throw new Error('User has no subscription')
    }

    const [user] = await queryPaddle<PaddleClassicUser[]>(
      'subscription/users',
      {
        subscription_id: subscription.id,
      },
    )

    return {
      cancelUrl: user.cancel_url,
      updateUrl: user.update_url,
    }
  }
