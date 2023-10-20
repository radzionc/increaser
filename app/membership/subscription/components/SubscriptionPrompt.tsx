import { ClosableComponentProps } from '@increaser/ui/props'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { useState } from 'react'
import { Modal } from '@increaser/ui/modal'
import { Match } from '@increaser/ui/ui/Match'
import { SubscriptionBillingCycleProvider } from '@increaser/ui/subscription/components/SubscriptionBillingCycleProvider'
import { SubscriptionOffer } from './SubscriptionOffer'
import { SubscriptionCheckout } from './SubscriptionCheckout'

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
