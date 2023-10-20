import { VStack } from '@increaser/ui/ui/Stack'
import { SubscriptionBillingCycleInput } from '@increaser/ui/subscription/components/SubscriptionBillingCycleInput'
import { SubscriptionPrice } from '@increaser/ui/subscription/components/SubscriptionPrice'
import { getAnnualSubscriptionSavings } from '@increaser/entities-utils/subscription/getAnnualSubscriptionSavings'
import { useSubscriptionBillingCycle } from '@increaser/ui/subscription/components/SubscriptionBillingCycleProvider'
import { MembershipBenefits } from 'membership/components/MembershipBenefits'
import { SubscriptionPricesQueryDependant } from '@increaser/paddle-ui/components/SubscriptionPricesQueryDependant'

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
      <MembershipBenefits />
    </VStack>
  )
}
