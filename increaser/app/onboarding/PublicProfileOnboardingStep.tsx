import { VStack } from '@lib/ui/layout/Stack'
import { ManageProfile } from '../community/components/ManageProfile'

export const PublicProfileOnboardingStep = () => {
  return (
    <VStack style={{ width: 'fit-content' }} gap={40}>
      <ManageProfile />
    </VStack>
  )
}
