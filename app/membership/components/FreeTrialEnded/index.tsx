import { trackEvent } from 'analytics'
import { FREE_TRIAL_DAYS, MembershipPeriod } from 'membership'
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
  const [membershipPeriod, setMembershipPeriod] =
    useState<MembershipPeriod | null>(null)

  const { closeFreeTrialEndedModal } = useMembership()

  const handleClose = () => {
    if (membershipPeriod) {
      setMembershipPeriod(null)
    } else {
      closeFreeTrialEndedModal()
    }
  }

  const handleCloseCheckout = useCallback(() => {
    setMembershipPeriod(null)
  }, [])

  const handleMembershipPeriodSelect = (period: MembershipPeriod) => {
    trackEvent(`Start ${period} membership checkout`)
    setMembershipPeriod(period)
  }

  const { isSuccess: isPaddleLoaded } = usePaddleSdk()

  return (
    <PaddleModal
      onClose={handleClose}
      title={
        membershipPeriod ? null : (
          <Text>
            <EmojiTextPrefix emoji="✅" /> {FREE_TRIAL_DAYS} days free trial
            ended
          </Text>
        )
      }
      renderContent={() => (
        <>
          {!membershipPeriod && (
            <>
              <Spacer height={20} />
              <SaleContent
                onMembershipPeriodSelect={handleMembershipPeriodSelect}
              />
            </>
          )}
          {isPaddleLoaded && (
            <div
              style={
                membershipPeriod
                  ? undefined
                  : { position: 'absolute', bottom: 10000 }
              }
            >
              <CheckoutContent
                onClose={handleCloseCheckout}
                period={membershipPeriod || 'yearly'}
              />
            </div>
          )}
        </>
      )}
    />
  )
}
