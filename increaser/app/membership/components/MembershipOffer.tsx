import { SubscriptionBillingCycleProvider } from '@lib/subscription-ui/SubscriptionBillingCycleProvider'
import { SubscriptionCheckout } from '@increaser/app/membership/subscription/components/SubscriptionCheckout'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { SubscriptionBillingCycleSelector } from './SubscriptionBillingCycleSelector'
import { Panel } from '@lib/ui/panel/Panel'
import styled from 'styled-components'

const Container = styled(Panel)`
  gap: 0px;
`

export const MembershipOffer = () => {
  const { lifeTimeDeal, subscription } = useAssertUserState()

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
