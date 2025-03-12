import { pick } from '@lib/utils/record/pick'
import { ProductFeatureResponse } from '@product/api-interface/ProductFeatureResponse'
import { getAllFeatures } from '@product/db/features'

import { ApiResolver } from '../../resolvers/ApiResolver'

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
