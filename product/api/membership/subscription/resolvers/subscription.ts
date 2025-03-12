import { updateUser } from '@product/db/user'
import { getSubscription } from '@product/paddle-classic/utils/getSubscription'

import { assertUserId } from '../../../auth/assertUserId'
import { ApiResolver } from '../../../resolvers/ApiResolver'

export const subscription: ApiResolver<'subscription'> = async ({
  input: { id: subscriptionId },
  context,
}) => {
  const userId = assertUserId(context)
  const subscription = await getSubscription(subscriptionId)
  await updateUser(userId, { subscription })

  return subscription
}
