import { VStack } from '@lib/ui/layout/Stack'

import { useState } from 'react'

import { Center } from '@lib/ui/layout/Center'
import { ContinueButton } from '@increaser/app/ui/ContinueButton'
import { ShyTextButton } from '@lib/ui/buttons/ShyTextButton'
import { SubscriptionCheckout } from './SubscriptionCheckout'
import { ClosableComponentProps } from '@lib/ui/props'
import { Modal } from '@lib/ui/modal'
import { SubscriptionOffer } from './SubscriptionOffer'
import { SubscriptionBillingCycleProvider } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { Match } from '@lib/ui/base/Match'
import { productName } from '@increaser/entities'

interface Props extends ClosableComponentProps {
  onNext: () => void
}

type SubscriptionOnboardingStage = 'offer' | 'checkout'

export const SubscriptionOnboarding = ({ onNext, onClose }: Props) => {
  const [stage, setStage] = useState<SubscriptionOnboardingStage>('offer')

  return (
    <SubscriptionBillingCycleProvider>
      <Match
        value={stage}
        offer={() => (
          <Modal
            title={`Achieve your goals with ${productName}`}
            placement="top"
            onClose={onClose}
            footer={
              <VStack fullWidth gap={8}>
                <ContinueButton onClick={() => setStage('checkout')} />
                <Center>
                  <ShyTextButton text={'Skip'} onClick={onNext} />
                </Center>
              </VStack>
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
