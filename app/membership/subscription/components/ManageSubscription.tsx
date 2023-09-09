import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useAssertUserState } from 'user/state/UserStateContext'
import { UpdateSubscription } from './UpdateSubscription'
import { CancelSubscription } from './CancelSubscription'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { SubscriptionOffer } from './SubscriptionOffer'

const formatDate = (string: string) => {
  const [year, month, day] = string.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleString()
}

export const ManageSubscription = () => {
  const { membership } = useAssertUserState()

  if (!membership) return null

  if (membership.provider === 'AppSumo') {
    return <Text>You have a life-time access!</Text>
  }

  const { subscription } = membership

  if (subscription) {
    const { cancelUrl, nextBillDate, cancellationEffectiveDate } = subscription
    if (!cancelUrl) return null

    if (nextBillDate) {
      return (
        <HStack gap={32} wrap="wrap">
          <VStack alignItems="stretch" gap={20}>
            <Text>
              Next payment:{' '}
              <Text as="span" weight="bold">
                {formatDate(nextBillDate)}
              </Text>
            </Text>
            <UpdateSubscription />
            <CancelSubscription />
          </VStack>
        </HStack>
      )
    }

    if (cancellationEffectiveDate) {
      return (
        <VStack alignItems="start" gap={20} wrap="wrap">
          <Text>
            Member until:{' '}
            <Text as="span" weight="bold">
              {formatDate(cancellationEffectiveDate)}
            </Text>
          </Text>
          <Panel>
            <SubscriptionOffer />
          </Panel>
        </VStack>
      )
    }
  }

  return null
}
