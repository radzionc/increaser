import { Text } from '@lib/ui/text'
import {
  QueryDependant,
  QueryDependantProps,
} from '@lib/ui/query/components/QueryDependant'
import { Center } from '@lib/ui/layout/Center'
import { Spinner } from '@lib/ui/loaders/Spinner'
import {
  SubscriptionPrices,
  useSubscriptionPricesQuery,
} from '../hooks/useSubscriptionPricesQuery'

interface SubscriptionPricesQueryDependantProps
  extends Pick<QueryDependantProps<SubscriptionPrices>, 'success'> {}

export const SubscriptionPricesQueryDependant = ({
  success,
}: SubscriptionPricesQueryDependantProps) => {
  const query = useSubscriptionPricesQuery()

  return (
    <QueryDependant
      query={query}
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
