import { trackEvent } from 'analytics'
import { MembershipProvider } from 'membership'
import { PaddleProductCode } from 'membership/paddle/PaddleProductCode'
import { useCallback } from 'react'
import { Path } from 'router/Path'
import { useUserState } from 'user/state/UserStateContext'

import { useMembership } from './MembershipContext'
import { PaddleIFrame } from './PaddleIFrame'
import { useRouter } from 'next/router'
import { SubscriptionCadence } from '@increaser/ui/subscription/SubscriptionCadence'

interface Props {
  period: SubscriptionCadence
  onClose: () => void
}

export const CheckoutContent = ({ period, onClose }: Props) => {
  const router = useRouter()
  const { pullRemoteState, updateState } = useUserState()
  const { openMembershipSuccessModal } = useMembership()

  const onSuccess = useCallback(() => {
    router.push(Path.Home)

    openMembershipSuccessModal()

    // TO-DO: implement polling of the subscription info
    updateState({ membership: { provider: MembershipProvider.Paddle } })
    pullRemoteState()

    trackEvent('Buy Membership')
  }, [router, openMembershipSuccessModal, pullRemoteState, updateState])

  return (
    <PaddleIFrame
      onSuccess={onSuccess}
      onClose={onClose}
      product={PaddleProductCode[period]}
    />
  )
}
