import { VStack } from '@lib/ui/css/stack'
import { MembersTelegram } from '@product/app/communication/MembersTelegram'

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
