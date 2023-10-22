import { useSubscriptionIdQuery } from '../hooks/useSubscriptionIdQuery'
import { CopyText } from '@increaser/ui/ui/CopyText'
import { Spinner } from '@increaser/ui/ui/Spinner'
import { VStack } from '@increaser/ui/ui/Stack'
import { InfoIcon } from '@increaser/ui/ui/icons/InfoIcon'
import { ApiError } from '../../app/api/useApi'
import { AUTHOR_EMAIL } from '../../app/shared/externalResources'
import { Text } from '@increaser/ui/ui/Text'
import { useOnQuerySuccess } from '@increaser/ui/query/hooks/useOnQuerySuccess'

interface QuerySubscriptionIdProps {
  checkoutId: string
  onSuccess: (subscriptionId: string) => void
}

export const QuerySubscriptionId = ({
  checkoutId,
  onSuccess,
}: QuerySubscriptionIdProps) => {
  const query = useSubscriptionIdQuery(checkoutId)
  useOnQuerySuccess(query, onSuccess)

  const { error } = query

  return (
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
  )
}
