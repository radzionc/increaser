import { FinishableComponentProps } from '@increaser/ui/props'
import { useSubscriptionQuery } from '../hooks/useSubscriptionQuery'
import { useOnQuerySuccess } from '@increaser/ui/query/hooks/useOnQuerySuccess'
import { BlockingQuery } from '@increaser/ui/query/components/BlockingQuery'

interface SyncSubscriptionProps extends FinishableComponentProps {
  subscriptionId: string
}

export const SyncSubscription = ({
  subscriptionId,
  onFinish,
}: SyncSubscriptionProps) => {
  const query = useSubscriptionQuery(subscriptionId)
  useOnQuerySuccess(query, onFinish)

  return <BlockingQuery error={query.error as Error} />
}
