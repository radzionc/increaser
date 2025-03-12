import { VStack } from '@lib/ui/css/stack'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { order } from '@lib/utils/array/order'
import { splitBy } from '@lib/utils/array/splitBy'
import { useApiQuery } from '@product/api-ui/hooks/useApiQuery'
import { ProductFeatureStatus } from '@product/entities/ProductFeature'
import { useUser } from '@product/ui/user/state/user'

import { CurrentProductFeatureProvider } from './CurrentProductFeatureProvider'
import { ProductFeatureItem } from './ProductFeatureItem'

type ProductFeatureListProps = {
  status: ProductFeatureStatus
}

export const ProductFeatureList = ({ status }: ProductFeatureListProps) => {
  const featuresQuery = useApiQuery('features', undefined)
  const { id } = useUser()

  return (
    <VStack>
      <MatchQuery
        value={featuresQuery}
        pending={() => <Spinner />}
        success={(features) => {
          const [myUnapprovedFeatures, otherFeatures] = splitBy(
            features.filter((feature) => status === feature.status),
            (feature) =>
              feature.proposedBy === id && !feature.isApproved ? 0 : 1,
          )

          return (
            <>
              {[
                ...myUnapprovedFeatures,
                ...order(otherFeatures, (f) => f.upvotes, 'desc'),
              ].map((feature) => (
                <CurrentProductFeatureProvider key={feature.id} value={feature}>
                  <ProductFeatureItem />
                </CurrentProductFeatureProvider>
              ))}
            </>
          )
        }}
      />
    </VStack>
  )
}
