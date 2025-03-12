import { Center } from '@lib/ui/layout/Center'
import { Spinner } from '@lib/ui/loaders/Spinner'
import {
  MatchQuery,
  MatchQueryProps,
} from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'

import {
  SubscriptionPrices,
  useSubscriptionPricesQuery,
} from '../hooks/useSubscriptionPricesQuery'

interface MatchSubscriptionPricesQueryProps
  extends Pick<MatchQueryProps<SubscriptionPrices>, 'success'> {}

export const MatchSubscriptionPricesQuery = ({
  success,
}: MatchSubscriptionPricesQueryProps) => {
  const query = useSubscriptionPricesQuery()

  return (
    <MatchQuery
      value={query}
      error={() => <Text>Failed to load subscription price</Text>}
      pending={() => (
        <Center>
          <Spinner />
        </Center>
      )}
      success={success}
    />
  )
}
