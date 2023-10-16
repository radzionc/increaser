import { ClosableComponentProps } from '@increaser/ui/props'
import { SubscriptionPricesQueryDependant } from './SubscriptionPricesQueryDependant'
import { SubscriptionPrice } from '@increaser/ui/subscription/components/SubscriptionPrice'
import { getYearlySubscriptionSavings } from '@increaser/ui/subscription/utils/getYearlySubscriptionSavings'
import { VStack } from '@increaser/ui/ui/Stack'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { CheckoutModal } from './CheckoutModal'
import { SubscriptionBenefits } from './SubscriptionBenefits'
import { useState } from 'react'
import { SubscriptionBillingCycle } from '@increaser/entities/Subscription'
import { SubscriptionBillingCycleInput } from '@increaser/ui/subscription/components/SubscriptionBillingCycleInput'
import { Modal } from '@increaser/ui/modal'
import { Match } from '@increaser/ui/ui/Match'

type SubscriptionPromptStage = 'offer' | 'checkout'

export const SubscriptionRequiredOverlay = ({
  onClose,
}: ClosableComponentProps) => {
  const [billingCycle, setBillingCycle] =
    useState<SubscriptionBillingCycle>('year')

  const [stage, setStage] = useState<SubscriptionPromptStage>('offer')

  return (
    <Match
      value={stage}
      offer={() => (
        <Modal title="Subscribe to continue" onClose={onClose}>
          <SubscriptionPricesQueryDependant
            success={(prices) => (
              <VStack gap={28}>
                <VStack alignItems="center" gap={20}>
                  <SubscriptionBillingCycleInput
                    value={billingCycle}
                    onChange={setBillingCycle}
                    saving={getYearlySubscriptionSavings(
                      prices.year.amount,
                      prices.month.amount,
                    )}
                  />
                  <SubscriptionPrice
                    currency={prices.year.currency}
                    billingCycle={billingCycle}
                    price={{
                      month: prices.month.amount,
                      year: prices.year.amount,
                    }}
                  />
                  <SubscriptionBenefits />
                </VStack>
                <Button
                  onClick={() => setStage('checkout')}
                  style={{ width: '100%' }}
                  kind="reversed"
                  size="l"
                >
                  Purchase
                </Button>
              </VStack>
            )}
          />
        </Modal>
      )}
      checkout={() => (
        <CheckoutModal billingCycle={billingCycle} onClose={onClose} />
      )}
    />
  )
}
