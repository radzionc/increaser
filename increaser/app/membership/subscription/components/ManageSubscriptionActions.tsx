import { PaddleIFrame } from '@increaser/paddle-classic-ui/components/PaddleIFrame'
import { PaddleModal } from '@increaser/paddle-classic-ui/components/PaddleModal'
import { useManageSubscriptionQuery } from '../hooks/useManageSubscriptionQuery'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { HStack } from '@lib/ui/css/stack'
import { Button } from '@lib/ui/buttons/Button'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { useUser } from '@increaser/ui/user/state/user'
import { useState } from 'react'
import { SyncSubscription } from './SyncSubscription'
import { Match } from '@lib/ui/base/Match'
import { ModalContent } from '@lib/ui/modal/ModalContent'
import { Spinner } from '@lib/ui/loaders/Spinner'

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

  const user = useUser()
  const { subscription } = user
  const { planId } = shouldBeDefined(subscription ?? undefined)

  return (
    <MatchQuery
      value={query}
      pending={() => <Spinner />}
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
                <ModalContent>
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
                </ModalContent>
              </PaddleModal>
            )}
          </HStack>
        )
      }}
    />
  )
}
