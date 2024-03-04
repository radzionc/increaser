type ProductFeatureStatus = 'idea' | 'done'

export type ProductFeature = {
  id: string
  name: string
  description: string
  createdAt: number
  proposedBy: string
  upvotedBy: string[]
  isApproved: boolean
  status: ProductFeatureStatus
}

export const getProductFeautureDefaultFields = ({
  proposedBy,
}: Pick<ProductFeature, 'proposedBy'>): Pick<
  ProductFeature,
  'isApproved' | 'status' | 'proposedBy' | 'upvotedBy'
> => ({
  isApproved: false,
  status: 'idea',
  proposedBy,
  upvotedBy: [proposedBy],
})
