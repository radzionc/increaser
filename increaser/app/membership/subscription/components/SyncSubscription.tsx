import { useSubscriptionQuery } from '../hooks/useSubscriptionQuery'
import { useOnQuerySuccess } from '@lib/ui/query/hooks/useOnQuerySuccess'
import { BlockingQuery } from '@lib/ui/query/components/BlockingQuery'
import { supportEmail } from '@increaser/config'

interface SyncSubscriptionProps {
  subscriptionId: string
  onFinish?: () => void
}

export const SyncSubscription = ({
  subscriptionId,
  onFinish = () => {},
}: SyncSubscriptionProps) => {
  const query = useSubscriptionQuery(subscriptionId)
  useOnQuerySuccess(query, onFinish)

  return (
    <BlockingQuery supportEmail={supportEmail} error={query.error as Error} />
  )
}
