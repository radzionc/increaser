import { FinishableComponentProps } from '@increaser/ui/props'
import { useSubscriptionQuery } from '../hooks/useSubscriptionQuery'
import { CopyText } from '@increaser/ui/ui/CopyText'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { VStack } from '@increaser/ui/ui/Stack'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { InfoIcon } from '@increaser/ui/ui/icons/InfoIcon'
import { AUTHOR_EMAIL } from 'shared/externalResources'
import { useEffect } from 'react'
import { Text } from '@increaser/ui/ui/Text'
import { ApiError } from 'api/useApi'
import { Modal } from '@increaser/ui/modal'

interface SyncSubscriptionProps extends FinishableComponentProps {
  subscriptionId: string
}

export const SyncSubscription = ({
  subscriptionId,
  onFinish,
}: SyncSubscriptionProps) => {
  const { error, data } = useSubscriptionQuery(subscriptionId)
  useEffect(() => {
    if (data) {
      onFinish?.()
    }
  }, [data, onFinish])

  return (
    <Modal
      footer={
        error ? (
          <Button
            kind="secondary"
            style={{ width: '100%' }}
            onClick={onFinish}
            size="l"
          >
            Cancel
          </Button>
        ) : undefined
      }
      title="Loading Subscription"
      placement="top"
      onClose={onFinish}
    >
      <VStack alignItems="center" gap={20}>
        <Text
          style={{ display: 'flex' }}
          color={error ? 'alert' : 'regular'}
          size={80}
        >
          {error ? <InfoIcon /> : <Spinner />}
        </Text>
        {error ? (
          <>
            <Text style={{ wordBreak: 'break-word' }} centered height="large">
              {(error as ApiError)?.message}
            </Text>
            <Text centered color="supporting" size={14}>
              Nothing helps? Email us at <br />
              <CopyText color="regular" as="span" content={AUTHOR_EMAIL}>
                {AUTHOR_EMAIL}
              </CopyText>
            </Text>
          </>
        ) : null}
      </VStack>
    </Modal>
  )
}
