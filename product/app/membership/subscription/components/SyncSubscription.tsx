import { BlockingQuery } from '@lib/ui/query/components/BlockingQuery'
import { useOnQuerySuccess } from '@lib/ui/query/hooks/useOnQuerySuccess'
import { supportEmail } from '@product/config'

import { useSubscriptionQuery } from '../hooks/useSubscriptionQuery'

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
