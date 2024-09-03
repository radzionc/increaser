import { useApiQuery } from '@increaser/api-ui/hooks/useApiQuery'
import { QueryDependant } from '@lib/ui/query/components/QueryDependant'
import { getQueryDependantDefaultProps } from '@lib/ui/query/utils/getQueryDependantDefaultProps'
import { splitBy } from '@lib/utils/array/splitBy'
import { order } from '@lib/utils/array/order'
import { ProductFeatureItem } from './ProductFeatureItem'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { CurrentProductFeatureProvider } from './CurrentProductFeatureProvider'
import { VStack } from '@lib/ui/css/stack'
import { ProductFeatureStatus } from '@increaser/entities/ProductFeature'

type ProductFeatureListProps = {
  status: ProductFeatureStatus
}

export const ProductFeatureList = ({ status }: ProductFeatureListProps) => {
  const featuresQuery = useApiQuery('features', undefined)
  const { id } = useAssertUserState()

  return (
    <VStack>
      <QueryDependant
        query={featuresQuery}
        {...getQueryDependantDefaultProps('features')}
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
