import { BlockingQuery } from '@lib/ui/query/components/BlockingQuery'
import { useOnQuerySuccess } from '@lib/ui/query/hooks/useOnQuerySuccess'
import { supportEmail } from '@product/config'

import { useSubscriptionIdQuery } from '../hooks/useSubscriptionIdQuery'

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

  return <BlockingQuery supportEmail={supportEmail} error={query.error} />
}
