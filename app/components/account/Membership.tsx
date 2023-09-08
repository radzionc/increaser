import { MembersTelegram } from 'communication/MembersTelegram'
import { MembershipSaleCard } from 'membership/components/MembershipSaleCard'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { useAssertUserState } from 'user/state/UserStateContext'

import { ManageMembership } from './ManageMembership'

export const Membership = () => {
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
        <MembershipSaleCard />
        {freeTrialEnd > Date.now() ? (
          <Text>
            {formatDuration(freeTrialEnd - Date.now(), 'ms')} of free trial left
          </Text>
        ) : (
          <Text>Free trial expired</Text>
        )}
      </VStack>
    </>
  )
}
