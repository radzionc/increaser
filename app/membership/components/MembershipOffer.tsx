import { Panel } from '@increaser/ui/ui/Panel/Panel'
import { SubscriptionOffer } from 'membership/subscription/components/SubscriptionOffer'
import { useAssertUserState } from 'user/state/UserStateContext'

export const MembershipOffer = () => {
  const { lifeTimeDeal, subscription } = useAssertUserState()
  if (lifeTimeDeal) return null

  if (!subscription?.endsAt) return null

  return (
    <Panel>
      <SubscriptionOffer />
    </Panel>
  )
}
