import { VStack } from '@lib/ui/layout/Stack'
import { SubscriptionBillingCycleInput } from '@lib/subscription-ui/SubscriptionBillingCycleInput'
import { SubscriptionPrice } from '@lib/subscription-ui/SubscriptionPrice'
import { getAnnualSubscriptionSavings } from '@increaser/entities-utils/subscription/getAnnualSubscriptionSavings'
import { useSubscriptionBillingCycle } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { SubscriptionPricesQueryDependant } from '@increaser/paddle-classic-ui/components/SubscriptionPricesQueryDependant'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import {
  productTools,
  productToolNameRecord,
} from '@increaser/entities/ProductTool'
import { MembershipBenefit } from '@lib/ui/membership/components/MembershipBenefit'

export const SubscriptionOffer = () => {
  const [billingCycle, setBillingCycle] = useSubscriptionBillingCycle()

  return (
    <VStack alignItems="center" gap={20}>
      <SubscriptionPricesQueryDependant
        success={(prices) => (
          <>
            <SubscriptionBillingCycleInput
              value={billingCycle}
              onChange={setBillingCycle}
              saving={getAnnualSubscriptionSavings(
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
          </>
        )}
      />
      <UniformColumnGrid fullWidth gap={8} minChildrenWidth={160}>
        {productTools.map((tool) => (
          <MembershipBenefit benefit={productToolNameRecord[tool]} key={tool} />
        ))}
      </UniformColumnGrid>
    </VStack>
  )
}
