import { Text } from '@increaser/ui/text'
import {
  QueryDependant,
  QueryDependantProps,
} from '@increaser/ui/query/components/QueryDependant'
import { Center } from '@increaser/ui/layout/Center'
import { Spinner } from '@increaser/ui/loaders/Spinner'
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
      {...query}
      error={() => <Text>Failed to load subscription price</Text>}
      loading={() => (
        <Center>
          <Spinner />
        </Center>
      )}
      success={success}
    />
  )
}
