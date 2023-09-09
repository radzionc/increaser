import { ClosableComponentProps } from '@increaser/ui/props'
import { Modal } from '@increaser/ui/ui/Modal'
import { SubscriptionPricesQueryDependant } from './SubscriptionPricesQueryDependant'
import { SubscriptionCadenceInput } from '@increaser/ui/subscription/components/SubscriptionCadenceInput'
import { SubscriptionPrice } from '@increaser/ui/subscription/components/SubscriptionPrice'
import { getYearlySubscriptionSavings } from '@increaser/ui/subscription/utils/getYearlySubscriptionSavings'
import { Opener } from '@increaser/ui/ui/Opener'
import { VStack } from '@increaser/ui/ui/Stack'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { CheckoutModal } from './CheckoutModal'
import { SubscriptionBenefits } from './SubscriptionBenefits'
import { SubscriptionCadence } from '@increaser/ui/subscription/SubscriptionCadence'
import { useState } from 'react'

export const SubscriptionRequiredOverlay = ({
  onClose,
}: ClosableComponentProps) => {
  const [cadence, setCadence] = useState<SubscriptionCadence>('year')

  return (
    <Modal
      title="Subscribe to continue"
      onClose={onClose}
      renderContent={() => (
        <SubscriptionPricesQueryDependant
          success={(prices) => (
            <VStack gap={28}>
              <VStack alignItems="center" gap={20}>
                <SubscriptionCadenceInput
                  value={cadence}
                  onChange={setCadence}
                  saving={getYearlySubscriptionSavings(
                    prices.year.amount,
                    prices.month.amount,
                  )}
                />
                <SubscriptionPrice
                  currency={prices.year.currency}
                  cadence={cadence}
                  price={{
                    month: prices.month.amount,
                    year: prices.year.amount,
                  }}
                />
                <SubscriptionBenefits />
              </VStack>
              <Opener
                renderContent={({ onClose }) => (
                  <CheckoutModal period={cadence} onClose={onClose} />
                )}
                renderOpener={({ onOpen }) => (
                  <Button
                    style={{ width: '100%' }}
                    onClick={onOpen}
                    kind="reversed"
                    size="l"
                  >
                    Purchase
                  </Button>
                )}
              />
            </VStack>
          )}
        />
      )}
    />
  )
}
