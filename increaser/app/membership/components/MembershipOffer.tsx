import { SubscriptionBillingCycleProvider } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { SubscriptionCheckout } from '@increaser/app/membership/subscription/components/SubscriptionCheckout'
import { useUser } from '@increaser/ui/user/state/user'
import { Panel } from '@lib/ui/css/panel'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { SubscriptionBillingCycleSelector } from '@increaser/ui/subscription/SubscriptionBillingCycleSelector'

const Container = styled(Panel)`
  gap: 0px;

  > * {
    &:first-child {
      border-bottom: 2px solid ${getColor('mist')};
    }
  }
`

export const MembershipOffer = () => {
  const { lifeTimeDeal, subscription } = useUser()

  if (lifeTimeDeal || (subscription && !subscription.endsAt)) {
    return null
  }

  return (
    <SubscriptionBillingCycleProvider>
      <Container kind="secondary" withSections>
        <SubscriptionBillingCycleSelector />
        <SubscriptionCheckout />
      </Container>
    </SubscriptionBillingCycleProvider>
  )
}
