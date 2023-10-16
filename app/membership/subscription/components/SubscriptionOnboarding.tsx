import { VStack } from '@increaser/ui/ui/Stack'

import { useState } from 'react'
import { SubscriptionPrice } from '@increaser/ui/subscription/components/SubscriptionPrice'

import { getYearlySubscriptionSavings } from '@increaser/ui/subscription/utils/getYearlySubscriptionSavings'

import { Center } from '@increaser/ui/ui/Center'
import { ContinueButton } from 'ui/ContinueButton'
import { ShyTextButton } from '@increaser/ui/ui/buttons/ShyTextButton'
import { SubscriptionBenefits } from './SubscriptionBenefits'
import { CheckoutModal } from './CheckoutModal'
import { SubscriptionPricesQueryDependant } from './SubscriptionPricesQueryDependant'
import { SubscriptionBillingCycle } from '@increaser/entities/Subscription'
import { SubscriptionBillingCycleInput } from '@increaser/ui/subscription/components/SubscriptionBillingCycleInput'
import { ClosableComponentProps } from '@increaser/ui/props'
import { Modal } from '@increaser/ui/modal'

interface Props extends ClosableComponentProps {
  onNext: () => void
}

export const SubscriptionOnboarding = ({ onNext, onClose }: Props) => {
  const [billingCycle, setBillingCycle] =
    useState<SubscriptionBillingCycle>('year')
  const [showCheckout, setShowCheckout] = useState(false)

  if (showCheckout) {
    return <CheckoutModal billingCycle={billingCycle} onClose={onNext} />
  }

  return (
    <Modal
      title="Achieve your goals with Increaser"
      placement="top"
      onClose={onClose}
      footer={
        <VStack fullWidth gap={8}>
          <ContinueButton onClick={() => setShowCheckout(true)} />
          <Center>
            <ShyTextButton text={'Skip'} onClick={onNext} />
          </Center>
        </VStack>
      }
    >
      <SubscriptionPricesQueryDependant
        success={(prices) => {
          return (
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
          )
        }}
      />
    </Modal>
  )
}
