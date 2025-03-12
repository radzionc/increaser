import { SubscriptionBillingCycleProvider } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { Panel } from '@lib/ui/css/panel'
import { getColor } from '@lib/ui/theme/getters'
import { SubscriptionCheckout } from '@product/app/membership/subscription/components/SubscriptionCheckout'
import { SubscriptionBillingCycleSelector } from '@product/ui/subscription/SubscriptionBillingCycleSelector'
import { useUser } from '@product/ui/user/state/user'
import styled from 'styled-components'

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
