import { MembersTelegram } from 'communication/MembersTelegram'
import { VStack } from '@increaser/ui/ui/Stack'
import { useAssertUserState } from 'user/state/UserStateContext'

import { FreeTrialStatus } from '../subscription/components/FreeTrialStatus'
import { SubscriptionOffer } from '../subscription/components/SubscriptionOffer'
import { ManageSubscription } from '../subscription/components/ManageSubscription'
import { Panel } from '@increaser/ui/ui/Panel/Panel'

export const MembershipOverview = () => {
  const { membership } = useAssertUserState()

  if (membership) {
    return (
      <VStack gap={12}>
        <ManageSubscription />
        <MembersTelegram />
      </VStack>
    )
  }

  return (
    <VStack alignItems="start" gap={20}>
      <Panel>
        <SubscriptionOffer />
      </Panel>
      <FreeTrialStatus />
    </VStack>
  )
}
