import { MembersTelegram } from 'communication/MembersTelegram'
import { SubscriptionCadence } from '@increaser/ui/subscription/SubscriptionCadence'
import { CheckoutModal } from 'membership/components/CheckoutModal'
import { MembershipSaleCard } from 'membership/components/MembershipSaleCard'
import { useState } from 'react'
import { formatDuration } from 'shared/utils/formatDuration'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useAssertUserState } from 'user/state/UserStateContext'

import { ManageMembership } from './ManageMembership'

export const Membership = () => {
  const [period, setPeriod] = useState<SubscriptionCadence | null>(null)

  const { membership, freeTrialEnd } = useAssertUserState()

  if (membership) {
    return (
      <VStack gap={12}>
        <ManageMembership />
        <MembersTelegram />
      </VStack>
    )
  }

  return (
    <>
      <VStack style={{ width: 380 }} gap={20}>
        <MembershipSaleCard onPurchaseRequest={setPeriod} />
        {freeTrialEnd > Date.now() ? (
          <Text>
            {formatDuration(freeTrialEnd - Date.now(), 'ms')} of free trial left
          </Text>
        ) : (
          <Text>Free trial expired</Text>
        )}
      </VStack>
      {period && (
        <CheckoutModal period={period} onClose={() => setPeriod(null)} />
      )}
    </>
  )
}
