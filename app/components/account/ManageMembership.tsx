import { MembershipPeriod, MembershipProvider } from 'membership'
import { CheckoutModal } from 'membership/components/CheckoutModal'
import { MembershipSaleCard } from 'membership/components/MembershipSaleCard'
import { useState } from 'react'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useAssertUserState } from 'user/state/UserStateContext'

import { CancelMembership } from './CancelMembership'
import { UpdateMembership } from './UpdateMembership'

const formatDate = (string: string) => {
  const [year, month, day] = string.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleString()
}

export const ManageMembership = () => {
  const { membership } = useAssertUserState()

  const [period, setPeriod] = useState<MembershipPeriod | null>(null)

  if (!membership) return null

  if (membership.provider === MembershipProvider.AppSumo) {
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
            <UpdateMembership />
            <CancelMembership />
            {/* <Refund /> */}
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
          <MembershipSaleCard onPurchaseRequest={setPeriod} />
          {period && (
            <CheckoutModal period={period} onClose={() => setPeriod(null)} />
          )}
        </VStack>
      )
    }
  }

  return null
}
