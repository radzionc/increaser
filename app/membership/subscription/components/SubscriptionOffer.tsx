import { useState } from 'react'
import { VStack } from '@increaser/ui/ui/Stack'
import { SubscriptionBillingCycleInput } from '@increaser/ui/subscription/components/SubscriptionBillingCycleInput'
import { SubscriptionPrice } from '@increaser/ui/subscription/components/SubscriptionPrice'
import { getYearlySubscriptionSavings } from '@increaser/ui/subscription/utils/getYearlySubscriptionSavings'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Opener } from '@increaser/ui/ui/Opener'
import { CheckoutModal } from './CheckoutModal'
import { SubscriptionBenefits } from './SubscriptionBenefits'
import { SubscriptionPricesQueryDependant } from './SubscriptionPricesQueryDependant'
import { SubscriptionBillingCycle } from '@increaser/entities/Subscription'

export const SubscriptionOffer = () => {
  const [billingCycle, setBillingCycle] =
    useState<SubscriptionBillingCycle>('year')

  return (
    <SubscriptionPricesQueryDependant
      success={(prices) => {
        return (
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
            <Opener
              renderContent={({ onClose }) => (
                <CheckoutModal billingCycle={billingCycle} onClose={onClose} />
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
