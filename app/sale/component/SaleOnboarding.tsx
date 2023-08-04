import { Modal } from '@increaser/ui/ui/Modal'
import { VStack } from '@increaser/ui/ui/Stack'
import { SubscriptionCadence } from '@increaser/ui/subscription/SubscriptionCadence'

import { useState } from 'react'
import { SubscriptionCadenceInput } from '@increaser/ui/subscription/components/SubscriptionCadenceInput'
import { SubscriptionPrice } from '@increaser/ui/subscription/components/SubscriptionPrice'

import { getYearlySubscriptionSavings } from '@increaser/ui/subscription/utils/getYearlySubscriptionSavings'

import { useMembershipPricesQuery } from 'membership/hooks/useMembershipPricesQuery'
import { QueryDependant } from '@increaser/ui/query/components/QueryDependant'
import { Text } from '@increaser/ui/ui/Text'
import { Center } from '@increaser/ui/ui/Center'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { ContinueButton } from 'ui/ContinueButton'
import { CheckoutModal } from 'membership/components/CheckoutModal'
import { ShyTextButton } from '@increaser/ui/ui/buttons/ShyTextButton'

interface Props {
  onNext: () => void
}

export const SaleOnboarding = ({ onNext }: Props) => {
  const [cadence, setCadence] = useState<SubscriptionCadence>('year')
  const { data, status } = useMembershipPricesQuery()
  const [showCheckout, setShowCheckout] = useState(false)

  if (showCheckout) {
    return <CheckoutModal period={cadence} onClose={onNext} />
  }

  return (
    <Modal
      title="Achieve your goals with Increaser"
      hasImplicitClose={false}
      placement="top"
      footer={
        <VStack fullWidth gap={8}>
          <ContinueButton onClick={() => setShowCheckout(true)} />
          <Center>
            <ShyTextButton text={'Skip'} onClick={onNext} />
          </Center>
        </VStack>
      }
      renderContent={() => {
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
              console.log('prices: ', prices)
              return (
                <VStack gap={20}>
                  <SubscriptionCadenceInput
                    value={cadence}
                    onChange={setCadence}
                    saving={getYearlySubscriptionSavings(
                      prices.year.amount,
                      prices.month.amount,
                    )}
                  />
                  <Center>
                    <SubscriptionPrice
                      currency={prices.year.currency}
                      cadence={cadence}
                      price={{
                        month: prices.month.amount,
                        year: prices.year.amount,
                      }}
                    />
                  </Center>
                </VStack>
              )
            }}
          />
        )
      }}
    />
  )
}
