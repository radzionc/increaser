import { ProductFeature } from '@product/entities/ProductFeature'

export type ProductFeatureResponse = Pick<
  ProductFeature,
  | 'id'
  | 'name'
  | 'description'
  | 'isApproved'
  | 'status'
  | 'proposedBy'
  | 'createdAt'
> & {
  upvotes: number
  upvotedByMe: boolean
}
