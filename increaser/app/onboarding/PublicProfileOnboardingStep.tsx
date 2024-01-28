import { VStack } from '@lib/ui/layout/Stack'
import { OnboardingStepView } from './OnboardingStepView'
import { ManageProfile } from '../community/components/ManageProfile'
import { Scoreboard } from '@increaser/ui/scoreboard/Scoreboard'
import { Text } from '@lib/ui/text'

export const PublicProfileOnboardingStep = () => {
  return (
    <OnboardingStepView>
      <VStack gap={40}>
        <Text height="large">
          Decide how you want to be represented on the leaderboard: stay
          anonymous or showcase your name and country. This step determines your
          visibility among Increaser’s community of productive users.
        </Text>
        <VStack style={{ width: 'fit-content' }} gap={40}>
          <ManageProfile />
          <Scoreboard />
        </VStack>
      </VStack>
    </OnboardingStepView>
  )
}
