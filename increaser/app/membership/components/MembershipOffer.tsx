import { SubscriptionBillingCycleProvider } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { Opener } from '@lib/ui/base/Opener'
import { Panel } from '@lib/ui/panel/Panel'
import { VStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { SubscriptionCheckout } from '@increaser/app/membership/subscription/components/SubscriptionCheckout'
import { SubscriptionOffer } from '@increaser/app/membership/subscription/components/SubscriptionOffer'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'

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
