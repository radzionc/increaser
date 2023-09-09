import {
  SubscriptionPrices,
  useSubscriptionPricesQuery,
} from 'membership/subscription/hooks/useSubscriptionPricesQuery'
import { Text } from '@increaser/ui/ui/Text'
import {
  QueryDependant,
  QueryDependantProps,
} from '@increaser/ui/query/components/QueryDependant'
import { Center } from '@increaser/ui/ui/Center'
import { Spinner } from '@increaser/ui/ui/Spinner'

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
