import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useAssertUserState } from 'user/state/UserStateContext'
import { ManageSubscriptionActions } from './ManageSubscriptionActions'
import { mirrorRecord } from '@increaser/utils/mirrorRecord'
import { paddleProductCode } from 'membership/paddle/PaddleProductCode'
import { format } from 'date-fns'

export const ManageSubscription = () => {
  const { subscription } = useAssertUserState()

  if (!subscription) return null

  if (subscription.endsAt) {
    if (subscription.endsAt < Date.now()) return null

    return (
      <Text>
        Your subscription ends on{' '}
        <Text as="span" weight="bold">
          {format(subscription.endsAt, 'dd MMMM yyyy')}
        </Text>
      </Text>
    )
  }

  if (subscription.status === 'canceled') {
    return null
  }

  if (subscription.status === 'pastDue') {
    return (
      <VStack gap={8}>
        <Text>
          Your subscription is past due. Please update your payment method to
          continue using the service.
        </Text>
        <ManageSubscriptionActions />
      </VStack>
    )
  }

  const billingCycle =
    mirrorRecord(paddleProductCode)[Number(subscription.planId)]

  const message = billingCycle
    ? `Your subscription renews automatically every ${billingCycle}.`
    : 'Your subscription renews automatically.'

  return (
    <VStack gap={16}>
      <Text>{message}</Text>
      <ManageSubscriptionActions />
    </VStack>
  )
}
