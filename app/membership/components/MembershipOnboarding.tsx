import { MembershipPeriod } from 'membership'
import { CheckoutContent } from 'membership/components/CheckoutContent'
import { MembershipSaleCard } from 'membership/components/MembershipSaleCard'
import { PaddleModal } from 'membership/components/PaddleModal'
import { useState } from 'react'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'

interface Props {
  onFinish: () => void
}

export const MembershipOnboarding = ({ onFinish }: Props) => {
  const [membershipPeriod, setMembershipPeriod] =
    useState<MembershipPeriod | null>(null)

  return (
    <PaddleModal
      placement="top"
      hasImplicitClose={!membershipPeriod}
      onClose={onFinish}
      title={membershipPeriod ? undefined : '✨ Realize your ambition!'}
      width={372}
      renderContent={() => (
        <>
          {!membershipPeriod && (
            <VStack alignItems="start" fullWidth gap={20}>
              {/* <Text>
                  <EmojiTextPrefix emoji={'😊'} />
                  Turn the grind of a consistent effort into a fun journey.
                </Text> */}
              <Text>
                <EmojiTextPrefix emoji="🤔" />
                What is the cost of life free of regrets about wasted
                time/potential?
              </Text>
              <MembershipSaleCard onPurchaseRequest={setMembershipPeriod} />
            </VStack>
          )}
          {membershipPeriod && (
            <CheckoutContent
              onClose={onFinish}
              period={membershipPeriod || 'yearly'}
            />
          )}
        </>
      )}
    />
  )
}
