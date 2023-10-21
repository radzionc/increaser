import { PaddleIFrame } from '@increaser/paddle-ui/components/PaddleIFrame'
import { PaddleModal } from '@increaser/paddle-ui/components/PaddleModal'
import { useManageSubscriptionQuery } from '../hooks/useManageSubscriptionQuery'
import { QueryDependant } from '@increaser/ui/query/components/QueryDependant'
import { getQueryDependantDefaultProps } from '@increaser/ui/query/utils/getQueryDependantDefaultProps'
import { HStack } from '@increaser/ui/ui/Stack'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'
import { useAssertUserState } from 'user/state/UserStateContext'
import { useState } from 'react'
import { SyncSubscription } from './SyncSubscription'

type ManageSubscriptionAction = 'update' | 'cancel'

export const ManageSubscriptionActions = () => {
  const [action, setAction] = useState<ManageSubscriptionAction | null>(null)
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null)

  const query = useManageSubscriptionQuery()

  const user = useAssertUserState()
  const { subscription } = user
  const { planId } = shouldBeDefined(subscription ?? undefined)

  return (
    <QueryDependant
      {...query}
      {...getQueryDependantDefaultProps('subscription management URLs')}
      success={({ updateUrl, cancelUrl }) => {
        const actionUrl: Record<ManageSubscriptionAction, string> = {
          update: updateUrl,
          cancel: cancelUrl,
        }

        const actionTitle: Record<ManageSubscriptionAction, string> = {
          update: 'Update Subscription',
          cancel: 'Cancel Subscription',
        }

        return (
          <HStack alignItems="center" gap={20}>
            <Button onClick={() => setAction('update')} kind="secondary">
              Update
            </Button>
            <Button onClick={() => setAction('cancel')} kind="alert">
              Cancel
            </Button>

            {action && (
              <PaddleModal
                title={actionTitle[action]}
                onClose={() => setAction(null)}
              >
                <PaddleIFrame
                  user={user}
                  override={actionUrl[action]}
                  product={planId}
                  onClose={() => setAction(null)}
                  onSuccess={() => {
                    if (user.subscription) {
                      setSubscriptionId(user.subscription.id)
                    }
                    setAction(null)
                  }}
                />
              </PaddleModal>
            )}

            {subscriptionId && (
              <SyncSubscription
                subscriptionId={subscriptionId}
                onFinish={() => setSubscriptionId(null)}
              />
            )}
          </HStack>
        )
      }}
    />
  )
}
