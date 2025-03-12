import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { useSubscriptionBillingCycle } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { Flow } from '@lib/ui/base/Flow'
import { PaddleIFrame } from '@product/paddle-classic-ui/components/PaddleIFrame'
import { QuerySubscriptionId } from '@product/paddle-classic-ui/components/QuerySubscriptionId'
import { paddleProductCode } from '@product/paddle-classic-ui/paddleProductCode'
import { useUser } from '@product/ui/user/state/user'
import { useState } from 'react'

import { PaddleIFrameTransition } from '../../components/PaddleIFrameTransition'

import { SyncSubscription } from './SyncSubscription'

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

export const SubscriptionCheckout = () => {
  const [step, setStep] = useState<SubscriptionCheckoutStep>({
    id: 'paddle',
  })

  const [billingCycle] = useSubscriptionBillingCycle()
  const user = useUser()

  const analytics = useAnalytics()

  return (
    <Flow
      step={step}
      steps={{
        paddle: () => (
          <>
            <PaddleIFrameTransition />
            <PaddleIFrame
              user={user}
              product={paddleProductCode[billingCycle]}
              onSuccess={(checkoutId) => {
                setStep({ id: 'subscriptionId', checkoutId })
                analytics.trackEvent('Subscription checkout success')
              }}
            />
          </>
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
          <SyncSubscription subscriptionId={subscriptionId} />
        ),
      }}
    />
  )
}
