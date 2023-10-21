import { SubscriptionBillingCycleProvider } from '@increaser/ui/subscription/components/SubscriptionBillingCycleProvider'
import { Opener } from '@increaser/ui/ui/Opener'
import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { VStack } from '@increaser/ui/ui/Stack'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { SubscriptionCheckout } from 'membership/subscription/components/SubscriptionCheckout'
import { SubscriptionOffer } from 'membership/subscription/components/SubscriptionOffer'
import { useAssertUserState } from 'user/state/UserStateContext'
import { isActiveSubscription } from '@increaser/entities-utils/subscription/isActiveSubscription'

export const MembershipOffer = () => {
  const { lifeTimeDeal, subscription } = useAssertUserState()

  if (lifeTimeDeal || (subscription && isActiveSubscription(subscription))) {
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
