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
import { Flow } from '@increaser/ui/ui/Flow'
import { QuerySubscriptionId } from '@increaser/paddle-ui/components/QuerySubscriptionId'

type SubscriptionCheckoutStep =
  | {
      id: 'paddle'
    }
  | {
      id: 'subscriptionId'
      checkoutId: string
    }
  | {
      id: 'subscription'
      subscriptionId: string
    }
  | {
      id: 'confirmation'
    }

type StepId = SubscriptionCheckoutStep['id']

const stepTitle: Record<StepId, string> = {
  paddle: `${productName} Subscription`,
  subscriptionId: 'Syncing Checkout...',
  subscription: 'Syncing Subscription...',
  confirmation: 'Congratulations!',
}

export const SubscriptionCheckout = ({ onClose }: ClosableComponentProps) => {
  const [step, setStep] = useState<SubscriptionCheckoutStep>({
    id: 'paddle',
  })

  const [billingCycle] = useSubscriptionBillingCycle()
  const user = useAssertUserState()

  return (
    <PaddleModal title={stepTitle[step.id]} onClose={onClose}>
      <Flow
        step={step}
        steps={{
          paddle: () => (
            <PaddleIFrame
              user={user}
              onClose={onClose}
              product={paddleProductCode[billingCycle]}
              onSuccess={(checkoutId) =>
                setStep({ id: 'subscriptionId', checkoutId })
              }
            />
          ),
          subscriptionId: ({ checkoutId }) => (
            <QuerySubscriptionId
              checkoutId={checkoutId}
              onSuccess={(subscriptionId) =>
                setStep({ id: 'subscription', subscriptionId })
              }
            />
          ),
          subscription: ({ subscriptionId }) => (
            <SyncSubscription
              onFinish={onClose}
              subscriptionId={subscriptionId}
            />
          ),
          confirmation: () => <MembershipConfirmation onFinish={onClose} />,
        }}
      />
    </PaddleModal>
  )
}
