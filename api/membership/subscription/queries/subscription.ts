import { assertUserId } from '../../../auth/assertUserId'
import { OperationContext } from '../../../gql/OperationContext'
import { QueryResolvers } from '../../../gql/schema'
import { updateUser } from '@increaser/db/user'
import { getSubscription } from '@increaser/paddle-classic/utils/getSubscription'

export const subscription: QueryResolvers<OperationContext>['subscription'] =
  async (_, { input: { id: subscriptionId } }, context) => {
    const userId = assertUserId(context)
    const subscription = await getSubscription(subscriptionId)
    await updateUser(userId, { subscription })

    return subscription
  }
