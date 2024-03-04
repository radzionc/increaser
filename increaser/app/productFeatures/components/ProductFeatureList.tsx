import { useApiQuery } from '@increaser/api-ui/hooks/useApiQuery'
import { QueryDependant } from '@lib/ui/query/components/QueryDependant'
import { getQueryDependantDefaultProps } from '@lib/ui/query/utils/getQueryDependantDefaultProps'
import { splitBy } from '@lib/utils/array/splitBy'
import { order } from '@lib/utils/array/order'
import { ProductFeatureItem } from './ProductFeatureItem'
import { useProductFeaturesView } from './ProductFeaturesView'

export const ProductFeatureList = () => {
  const featuresQuery = useApiQuery('features', undefined)
  const { view } = useProductFeaturesView()

  return (
    <QueryDependant
      query={featuresQuery}
      {...getQueryDependantDefaultProps('features')}
      success={(features) => {
        const [myUnapprovedFeatures, otherFeatures] = splitBy(
          features.filter((feature) => view === feature.status),
          (feature) => (feature.proposedByMe && !feature.isApproved ? 0 : 1),
        )

        return (
          <>
            {[
              ...myUnapprovedFeatures,
              ...order(otherFeatures, (f) => f.upvotes, 'desc'),
            ].map((feature) => (
              <ProductFeatureItem key={feature.id} value={feature} />
            ))}
          </>
        )
      }}
    />
  )
}
