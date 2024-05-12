import {
  productToolNameRecord,
  productTools,
} from '@increaser/entities/ProductTool'
import { VStack } from '@lib/ui/layout/Stack'
import { MembershipBenefit } from '@lib/ui/membership/components/MembershipBenefit'

export const MembershipBenefits = () => (
  <VStack gap={8}>
    {productTools.map((tool) => (
      <MembershipBenefit benefit={productToolNameRecord[tool]} key={tool} />
    ))}
  </VStack>
)
