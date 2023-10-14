import { MembersTelegram } from 'communication/MembersTelegram'
import { VStack } from '@increaser/ui/ui/Stack'

import { FreeTrialStatus } from '../subscription/components/FreeTrialStatus'
import { ManageSubscription } from '../subscription/components/ManageSubscription'
import { ManageLifeTimeDeal } from './ManageLifeTimeDeal'
import { MembershipOffer } from './MembershipOffer'

export const MembershipOverview = () => {
  return (
    <VStack alignItems="start" gap={20}>
      <ManageSubscription />
      <ManageLifeTimeDeal />
      <MembersTelegram />
      <FreeTrialStatus />
      <MembershipOffer />
    </VStack>
  )
}
