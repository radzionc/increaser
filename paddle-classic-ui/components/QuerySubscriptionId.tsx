import { useSubscriptionIdQuery } from '../hooks/useSubscriptionIdQuery'
import { useOnQuerySuccess } from '@increaser/ui/query/hooks/useOnQuerySuccess'
import { BlockingQuery } from '@increaser/ui/query/components/BlockingQuery'

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

  return <BlockingQuery error={query.error} />
}
