import { ClosableComponentProps } from '@lib/ui/props'
import { useSubscriptionBillingCycle } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { PaddleIFrame } from '@increaser/paddle-classic-ui/components/PaddleIFrame'
import { paddleProductCode } from '@increaser/paddle-classic-ui/paddleProductCode'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useEffect, useState } from 'react'
import { SyncSubscription } from './SyncSubscription'
import { PaddleModal } from '@increaser/paddle-classic-ui/components/PaddleModal'
import { productName } from '@increaser/entities'
import { Flow } from '@lib/ui/base/Flow'
import { QuerySubscriptionId } from '@increaser/paddle-classic-ui/components/QuerySubscriptionId'
import { analytics } from '../../../analytics'

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

type StepId = SubscriptionCheckoutStep['id']

const stepTitle: Record<StepId, string> = {
  paddle: `${productName} Subscription`,
  subscriptionId: 'Syncing Checkout...',
  subscription: 'Syncing Subscription...',
}

export const SubscriptionCheckout = ({ onClose }: ClosableComponentProps) => {
  const [step, setStep] = useState<SubscriptionCheckoutStep>({
    id: 'paddle',
  })

  const [billingCycle] = useSubscriptionBillingCycle()
  const user = useAssertUserState()

  useEffect(() => {
    analytics.trackEvent('Start subscription checkout')
  }, [])

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
              onSuccess={(checkoutId) => {
                setStep({ id: 'subscriptionId', checkoutId })
                analytics.trackEvent('Subscription checkout success')
              }}
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
        }}
      />
    </PaddleModal>
  )
}
