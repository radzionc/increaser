import { MembersTelegram } from '@increaser/app/communication/MembersTelegram'
import { VStack } from '@lib/ui/layout/Stack'

import { FreeTrialStatus } from '../subscription/components/FreeTrialStatus'
import { ManageSubscription } from '../subscription/components/ManageSubscription'
import { ManageLifeTimeDeal } from './ManageLifeTimeDeal'
import { MembershipOffer } from './MembershipOffer'

export const MembershipOverview = () => {
  return (
    <VStack fullWidth gap={20}>
      <ManageSubscription />
      <ManageLifeTimeDeal />
      <MembersTelegram />
      <FreeTrialStatus />
      <MembershipOffer />
    </VStack>
  )
}
