import { ClosableComponentProps } from '@increaser/ui/props'
import { useSubscriptionBillingCycle } from '@increaser/ui/subscription/components/SubscriptionBillingCycleProvider'
import { PaddleIFrame } from '@increaser/paddle-ui/components/PaddleIFrame'
import { paddleProductCode } from '@increaser/paddle-ui/paddleProductCode'
import { useAssertUserState } from 'user/state/UserStateContext'
import { useState } from 'react'
import { SyncSubscription } from './SyncSubscription'
import { MembershipConfirmation } from 'membership/components/MembershipConfirmation'
import { PaddleModal } from '@increaser/paddle-ui/components/PaddleModal'
import { productName } from '@increaser/entities'

export const SubscriptionCheckout = ({ onClose }: ClosableComponentProps) => {
  const [subscriptionId, setSubscriptionId] = useState<string | undefined>()
  const { subscription } = useAssertUserState()

  const [billingCycle] = useSubscriptionBillingCycle()
  const user = useAssertUserState()

  if (!subscriptionId) {
    return (
      <PaddleModal title={`${productName} Subscription`} onClose={onClose}>
        <PaddleIFrame
          user={user}
          onClose={onClose}
          product={paddleProductCode[billingCycle]}
          onSuccess={setSubscriptionId}
        />
      </PaddleModal>
    )
  }

  if (subscription) {
    return <MembershipConfirmation onFinish={onClose} />
  }

  return <SyncSubscription onFinish={onClose} subscriptionId={subscriptionId} />
}
