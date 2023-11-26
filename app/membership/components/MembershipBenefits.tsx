import { VStack } from '@increaser/ui/layout/Stack'
import { MembershipBenefit } from '@increaser/ui/membership/components/MembershipBenefit'

export const MembershipBenefits = () => (
  <VStack gap={8}>
    <MembershipBenefit benefit="Enhance your focus" />
    <MembershipBenefit benefit="Finish work faster" />
    <MembershipBenefit benefit="Accelerate your career" />
    <MembershipBenefit benefit="Develop positive habits" />
    <MembershipBenefit benefit="Boundaries for work-life balance" />
  </VStack>
)
