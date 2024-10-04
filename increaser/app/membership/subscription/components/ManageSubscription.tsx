import { VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { useUser } from '@increaser/ui/user/state/user'
import { ManageSubscriptionActions } from './ManageSubscriptionActions'
import { mirrorRecord } from '@lib/utils/record/mirrorRecord'
import { format } from 'date-fns'
import { paddleProductCode } from '@increaser/paddle-classic-ui/paddleProductCode'

const subscriptionDateFormat = 'dd MMMM yyyy'

export const ManageSubscription = () => {
  const { subscription } = useUser()

  if (!subscription) return null

  if (subscription.endsAt) {
    if (subscription.endsAt < Date.now()) return null

    return (
      <Text>
        Your subscription ends on{' '}
        <Text as="span" weight="600">
          {format(subscription.endsAt, subscriptionDateFormat)}
        </Text>
      </Text>
    )
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

  const messages = [
    billingCycle
      ? `Your subscription renews automatically every ${billingCycle}.`
      : 'Your subscription renews automatically.',
  ]

  if (subscription.nextBilledAt) {
    messages.push(
      `Next billing date is ${format(
        subscription.nextBilledAt,
        subscriptionDateFormat,
      )}.`,
    )
  }

  return (
    <VStack gap={16}>
      <VStack gap={4}>
        {messages.map((message) => (
          <Text key={message}>{message}</Text>
        ))}
      </VStack>
      <ManageSubscriptionActions />
    </VStack>
  )
}
