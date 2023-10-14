import { analytics } from 'analytics'
import { useCallback } from 'react'
import { Path } from 'router/Path'
import { useUserState } from 'user/state/UserStateContext'

import { PaddleIFrame } from '../../paddle/PaddleIFrame'
import { useRouter } from 'next/router'
import { paddleProductCode } from 'membership/paddle/PaddleProductCode'
import { SubscriptionBillingCycle } from '@increaser/entities/Subscription'

interface Props {
  billingCycle: SubscriptionBillingCycle
  onClose: () => void
}

export const CheckoutContent = ({ billingCycle, onClose }: Props) => {
  const router = useRouter()
  const { pullRemoteState, updateState } = useUserState()

  const onSuccess = useCallback(() => {
    router.push(Path.Home)

    // TO-DO: implement polling of the subscription info
    updateState({ membership: { provider: 'Paddle' } })
    pullRemoteState()

    analytics.trackEvent('Buy Membership')
  }, [router, pullRemoteState, updateState])

  return (
    <PaddleIFrame
      onSuccess={onSuccess}
      onClose={onClose}
      product={paddleProductCode[billingCycle]}
    />
  )
}
