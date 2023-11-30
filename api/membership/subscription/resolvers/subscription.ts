import { ApiResolver } from '@increaser/api-interface/ApiResolver'
import { assertUserId } from '../../../auth/assertUserId'
import { updateUser } from '@increaser/db/user'
import { getSubscription } from '@increaser/paddle-classic/utils/getSubscription'

export const subscription: ApiResolver<'subscription'> = async ({
  input: { id: subscriptionId },
  context,
}) => {
  const userId = assertUserId(context)
  const subscription = await getSubscription(subscriptionId)
  await updateUser(userId, { subscription })

  return subscription
}
