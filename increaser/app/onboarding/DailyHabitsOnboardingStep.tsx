import { VStack } from '@lib/ui/layout/Stack'
import { CuratedHabits } from '../habits/components/CuratedHabits'
import { OnboardingStepView } from './OnboardingStepView'
import { Text } from '@lib/ui/text'

export const DailyHabitsOnboardingStep = () => {
  return (
    <OnboardingStepView>
      <VStack gap={40}>
        <Text height="large">
          Choose from a variety of daily habits to build and track, aiming to
          improve your overall well-being and productivity. By establishing and
          monitoring these habits, Increaser helps you create a more structured
          and fulfilling daily routine.
        </Text>
        <CuratedHabits />
      </VStack>
    </OnboardingStepView>
  )
}
