import { ClosableComponentProps } from '@lib/ui/props'
import { Button } from '@lib/ui/buttons/Button'
import { useState } from 'react'
import { Modal } from '@lib/ui/modal'
import { Match } from '@lib/ui/base/Match'
import { SubscriptionBillingCycleProvider } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { SubscriptionCheckout } from './SubscriptionCheckout'
import { SubscriptionOffer } from '@increaser/ui/subscription/SubscriptionOffer'

type SubscriptionPromptStage = 'offer' | 'checkout'

export const SubscriptionPrompt = ({ onClose }: ClosableComponentProps) => {
  const [stage, setStage] = useState<SubscriptionPromptStage>('offer')

  return (
    <SubscriptionBillingCycleProvider>
      <Match
        value={stage}
        offer={() => (
          <Modal
            title="Subscribe to continue"
            onClose={onClose}
            footer={
              <Button
                onClick={() => setStage('checkout')}
                style={{ width: '100%' }}
                kind="reversed"
                size="l"
              >
                Purchase
              </Button>
            }
          >
            <SubscriptionOffer />
          </Modal>
        )}
        checkout={() => <SubscriptionCheckout onClose={onClose} />}
      />
    </SubscriptionBillingCycleProvider>
  )
}
