import { Match } from '@lib/ui/base/Match'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { ModalContent } from '@lib/ui/modal/ModalContent'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { PaddleIFrame } from '@product/paddle-classic-ui/components/PaddleIFrame'
import { PaddleModal } from '@product/paddle-classic-ui/components/PaddleModal'
import { useUser } from '@product/ui/user/state/user'
import { useState } from 'react'

import { useManageSubscriptionQuery } from '../hooks/useManageSubscriptionQuery'

import { SyncSubscription } from './SyncSubscription'

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
