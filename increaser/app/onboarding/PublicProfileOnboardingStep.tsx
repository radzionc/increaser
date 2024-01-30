import { VStack } from '@lib/ui/layout/Stack'
import { ManageProfile } from '../community/components/ManageProfile'
import { Scoreboard } from '@increaser/ui/scoreboard/Scoreboard'

export const PublicProfileOnboardingStep = () => {
  return (
    <VStack style={{ width: 'fit-content' }} gap={40}>
      <ManageProfile />
      <Scoreboard />
    </VStack>
  )
}
