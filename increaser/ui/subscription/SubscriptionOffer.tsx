import { VStack } from '@lib/ui/layout/Stack'
import { SubscriptionBillingCycleInput } from '@lib/subscription-ui/SubscriptionBillingCycleInput'
import { SubscriptionPrice } from '@lib/subscription-ui/SubscriptionPrice'
import { getAnnualSubscriptionSavings } from '@increaser/entities-utils/subscription/getAnnualSubscriptionSavings'
import { useSubscriptionBillingCycle } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { SubscriptionPricesQueryDependant } from '@increaser/paddle-classic-ui/components/SubscriptionPricesQueryDependant'
import { MembershipBenefits } from '../membership/MembershipBenefits'

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
