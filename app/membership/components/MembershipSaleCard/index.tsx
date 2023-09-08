import { SubscriptionCadence } from '@increaser/ui/subscription/SubscriptionCadence'
import { useMembershipPricesQuery } from 'membership/hooks/useMembershipPricesQuery'
import { useState } from 'react'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { QueryDependant } from '@increaser/ui/query/components/QueryDependant'
import { SubscriptionCadenceInput } from '@increaser/ui/subscription/components/SubscriptionCadenceInput'
import { SubscriptionPrice } from '@increaser/ui/subscription/components/SubscriptionPrice'
import { getYearlySubscriptionSavings } from '@increaser/ui/subscription/utils/getYearlySubscriptionSavings'
import { Center } from '@increaser/ui/ui/Center'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { SubscriptionBenefits } from 'sale/component/SubscriptionBenefits'
import { CheckoutModal } from '../CheckoutModal'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Opener } from '@increaser/ui/ui/Opener'

export const MembershipSaleCard = () => {
  const [cadence, setCadence] = useState<SubscriptionCadence>('year')
  const { data, status } = useMembershipPricesQuery()
  const [showCheckout, setShowCheckout] = useState(false)

  if (showCheckout) {
    return (
      <CheckoutModal period={cadence} onClose={() => setShowCheckout(false)} />
    )
  }

  return (
    <QueryDependant
      status={status}
      data={data}
      error={() => <Text>Failed to load subscription price</Text>}
      loading={() => (
        <Center>
          <Spinner />
        </Center>
      )}
      success={(prices) => {
        return (
          <VStack alignItems="start">
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
          </VStack>
        )
      }}
    />
  )
}
