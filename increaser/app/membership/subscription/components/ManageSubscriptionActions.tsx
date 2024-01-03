import { PaddleIFrame } from '@increaser/paddle-classic-ui/components/PaddleIFrame'
import { PaddleModal } from '@increaser/paddle-classic-ui/components/PaddleModal'
import { useManageSubscriptionQuery } from '../hooks/useManageSubscriptionQuery'
import { QueryDependant } from '@lib/ui/query/components/QueryDependant'
import { getQueryDependantDefaultProps } from '@lib/ui/query/utils/getQueryDependantDefaultProps'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useState } from 'react'
import { SyncSubscription } from './SyncSubscription'
import { Match } from '@lib/ui/base/Match'

type ManageSubscriptionAction = 'update' | 'cancel'

type Stage = ManageSubscriptionAction | 'sync'

const stageTitle: Record<Stage, string> = {
  update: 'Update Subscription',
  cancel: 'Cancel Subscription',
  sync: 'Syncing Subscription...',
}

export const ManageSubscriptionActions = () => {
  const [stage, setStage] = useState<Stage | null>(null)
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

        const renderActionContent = (action: ManageSubscriptionAction) => (
          <PaddleIFrame
            user={user}
            override={actionUrl[action]}
            product={planId}
            onClose={() => setStage(null)}
            onSuccess={() => {
              setStage('sync')
            }}
          />
        )

        return (
          <HStack alignItems="center" gap={20}>
            <Button onClick={() => setStage('update')} kind="secondary">
              Update
            </Button>
            <Button onClick={() => setStage('cancel')} kind="alert">
              Cancel
            </Button>

            {stage && (
              <PaddleModal
                title={stageTitle[stage]}
                onClose={() => setStage(null)}
              >
                <Match
                  value={stage}
                  update={() => renderActionContent('update')}
                  cancel={() => renderActionContent('cancel')}
                  sync={() => (
                    <SyncSubscription
                      subscriptionId={subscription!.id}
                      onFinish={() => setStage(null)}
                    />
                  )}
                />
              </PaddleModal>
            )}
          </HStack>
        )
      }}
    />
  )
}
