import { trackEvent } from 'analytics'
import { FREE_TRIAL_DAYS } from 'membership'
import { SubscriptionCadence } from '@increaser/ui/subscription/SubscriptionCadence'
import { usePaddleSdk } from 'membership/paddle/hooks/usePaddleSdk'
import { useCallback, useState } from 'react'
import { Spacer } from '@increaser/ui/ui/Spacer'
import { Text } from '@increaser/ui/ui/Text'

import { CheckoutContent } from '../CheckoutContent'
import { useMembership } from '../MembershipContext'
import { PaddleModal } from '../PaddleModal'
import { SaleContent } from './SaleContent'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'

export const FreeTrialEnded = () => {
  const [cadence, setCadence] = useState<SubscriptionCadence | null>(null)

  const { closeFreeTrialEndedModal } = useMembership()

  const handleClose = () => {
    if (cadence) {
      setCadence(null)
    } else {
      closeFreeTrialEndedModal()
    }
  }

  const handleCloseCheckout = useCallback(() => {
    setCadence(null)
  }, [])

  const handleSubscriptionCadenceSelect = (period: SubscriptionCadence) => {
    trackEvent(`Start ${period} membership checkout`)
    setCadence(period)
  }

  const { isSuccess: isPaddleLoaded } = usePaddleSdk()

  return (
    <PaddleModal
      onClose={handleClose}
      title={
        cadence ? null : (
          <Text>
            <EmojiTextPrefix emoji="✅" /> {FREE_TRIAL_DAYS} days free trial
            ended
          </Text>
        )
      }
      renderContent={() => (
        <>
          {!cadence && (
            <>
              <Spacer height={20} />
              <SaleContent
                onSubscriptionCadenceSelect={handleSubscriptionCadenceSelect}
              />
            </>
          )}
          {isPaddleLoaded && (
            <div
              style={
                cadence ? undefined : { position: 'absolute', bottom: 10000 }
              }
            >
              <CheckoutContent
                onClose={handleCloseCheckout}
                period={cadence || 'year'}
              />
            </div>
          )}
        </>
      )}
    />
  )
}
