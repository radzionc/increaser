import { ProductFeature } from '@increaser/entities/ProductFeature'

export type ProductFeatureResponse = Pick<
  ProductFeature,
  'id' | 'name' | 'description' | 'isApproved' | 'status'
> & {
  upvotes: number
  upvotedByMe: boolean
  proposedByMe: boolean
}
