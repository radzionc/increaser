import { PaddleIFrame } from '@increaser/paddle-ui/components/PaddleIFrame'
import { PaddleModal } from '@increaser/paddle-ui/components/PaddleModal'
import { useManageSubscriptionQuery } from '../hooks/useManageSubscriptionQuery'
import { QueryDependant } from '@increaser/ui/query/components/QueryDependant'
import { getQueryDependantDefaultProps } from '@increaser/ui/query/utils/getQueryDependantDefaultProps'
import { Opener } from '@increaser/ui/ui/Opener'
import { HStack } from '@increaser/ui/ui/Stack'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'
import { useAssertUserState } from 'user/state/UserStateContext'

export const ManageSubscriptionActions = () => {
  const query = useManageSubscriptionQuery()

  const { subscription } = useAssertUserState()
  const { planId } = shouldBeDefined(subscription ?? undefined)

  return (
    <QueryDependant
      {...query}
      {...getQueryDependantDefaultProps('subscription management URLs')}
      success={({ updateUrl, cancelUrl }) => (
        <HStack alignItems="center" gap={20}>
          <Opener
            renderOpener={({ onOpen }) => (
              <Button onClick={onOpen} kind="secondary">
                Update
              </Button>
            )}
            renderContent={({ onClose }) => (
              <PaddleModal title="Update Subscription" onClose={onClose}>
                <PaddleIFrame
                  override={updateUrl}
                  product={planId}
                  onClose={onClose}
                />
              </PaddleModal>
            )}
          />
          <Opener
            renderOpener={({ onOpen }) => (
              <Button onClick={onOpen} kind="alert">
                Cancel
              </Button>
            )}
            renderContent={({ onClose }) => (
              <PaddleModal onClose={onClose} title="Cancel Subscription">
                <PaddleIFrame
                  override={cancelUrl}
                  product={planId}
                  onClose={onClose}
                />
              </PaddleModal>
            )}
          />
        </HStack>
      )}
    />
  )
}
