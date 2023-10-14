import { useManageSubscriptionQuery } from '../hooks/useManageSubscriptionQuery'
import { QueryDependant } from '@increaser/ui/query/components/QueryDependant'
import { getQueryDependantDefaultProps } from '@increaser/ui/query/utils/getQueryDependantDefaultProps'
import { Opener } from '@increaser/ui/ui/Opener'
import { HStack } from '@increaser/ui/ui/Stack'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'
import { PaddleIFrame } from 'membership/paddle/PaddleIFrame'
import { PaddleModal } from 'membership/paddle/PaddleModal'
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
              <PaddleModal
                onClose={onClose}
                renderContent={() => (
                  <PaddleIFrame
                    override={updateUrl}
                    product={planId}
                    onSuccess={onClose}
                    onClose={onClose}
                  />
                )}
              />
            )}
          />
          <Opener
            renderOpener={({ onOpen }) => (
              <Button onClick={onOpen} kind="alert">
                Cancel
              </Button>
            )}
            renderContent={({ onClose }) => (
              <PaddleModal
                onClose={onClose}
                renderContent={() => (
                  <PaddleIFrame
                    override={cancelUrl}
                    product={planId}
                    onSuccess={onClose}
                    onClose={onClose}
                  />
                )}
              />
            )}
          />
        </HStack>
      )}
    />
  )
}
