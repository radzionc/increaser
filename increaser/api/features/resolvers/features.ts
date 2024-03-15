import { ApiResolver } from '../../resolvers/ApiResolver'
import { getAllFeatures } from '@increaser/db/features'
import { ProductFeatureResponse } from '@increaser/api-interface/ProductFeatureResponse'
import { pick } from '@lib/utils/record/pick'

export const features: ApiResolver<'features'> = async ({
  context: { userId },
}) => {
  const features = await getAllFeatures()

  const result: ProductFeatureResponse[] = []
  features.forEach((feature) => {
    if (!feature.isApproved && feature.proposedBy !== userId) {
      return
    }

    result.push({
      ...pick(feature, [
        'id',
        'name',
        'description',
        'isApproved',
        'status',
        'proposedBy',
        'createdAt',
      ]),
      upvotes: feature.upvotedBy.length,
      upvotedByMe: Boolean(userId && feature.upvotedBy.includes(userId)),
    })
  })

  return result
}
