import { SubscriptionBillingCycleProvider } from '@increaser/ui/subscription/components/SubscriptionBillingCycleProvider'
import { Opener } from '@increaser/ui/base/Opener'
import { Panel } from '@increaser/ui/panel/Panel'
import { VStack } from '@increaser/ui/layout/Stack'
import { Button } from '@increaser/ui/buttons/Button'
import { SubscriptionCheckout } from 'membership/subscription/components/SubscriptionCheckout'
import { SubscriptionOffer } from 'membership/subscription/components/SubscriptionOffer'
import { useAssertUserState } from 'user/state/UserStateContext'

export const MembershipOffer = () => {
  const { lifeTimeDeal, subscription } = useAssertUserState()

  if (lifeTimeDeal || (subscription && !subscription.endsAt)) {
    return null
  }

  return (
    <Panel>
      <SubscriptionBillingCycleProvider>
        <VStack gap={28}>
          <SubscriptionOffer />
          <Opener
            renderContent={({ onClose }) => (
              <SubscriptionCheckout onClose={onClose} />
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
      </SubscriptionBillingCycleProvider>
    </Panel>
  )
}
