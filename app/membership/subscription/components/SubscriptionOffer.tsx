import { SubscriptionCadence } from '@increaser/ui/subscription/SubscriptionCadence'
import { useState } from 'react'
import { VStack } from '@increaser/ui/ui/Stack'
import { SubscriptionCadenceInput } from '@increaser/ui/subscription/components/SubscriptionCadenceInput'
import { SubscriptionPrice } from '@increaser/ui/subscription/components/SubscriptionPrice'
import { getYearlySubscriptionSavings } from '@increaser/ui/subscription/utils/getYearlySubscriptionSavings'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Opener } from '@increaser/ui/ui/Opener'
import { CheckoutModal } from './CheckoutModal'
import { SubscriptionBenefits } from './SubscriptionBenefits'
import { SubscriptionPricesQueryDependant } from './SubscriptionPricesQueryDependant'

export const SubscriptionOffer = () => {
  const [cadence, setCadence] = useState<SubscriptionCadence>('year')

  return (
    <SubscriptionPricesQueryDependant
      success={(prices) => {
        return (
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
        )
      }}
    />
  )
}
