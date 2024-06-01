import {
  productTools,
  productToolNameRecord,
} from '@increaser/entities/ProductTool'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { MembershipBenefit } from '@lib/ui/membership/components/MembershipBenefit'

export const MembershipPersuasion = () => {
  return (
    <UniformColumnGrid fullWidth gap={8} minChildrenWidth={160}>
      {productTools.map((tool) => (
        <MembershipBenefit benefit={productToolNameRecord[tool]} key={tool} />
      ))}
    </UniformColumnGrid>
  )
}
