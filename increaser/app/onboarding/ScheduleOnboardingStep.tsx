import { VStack } from '@lib/ui/layout/Stack'
import { OnboardingStepView } from './OnboardingStepView'
import { ScheduleVisualization } from '@increaser/ui/schedule/ScheduleVisualization'
import { ManageSchedule } from '@increaser/ui/schedule/ManageSchedule'
import { ScheduleReview } from '../sets/components/ScheduleReview'
import { Text } from '@lib/ui/text'

export const ScheduleOnboardingStep = () => {
  return (
    <OnboardingStepView>
      <VStack gap={40}>
        <Text height="large">
          Customize your daily schedule to align with your health and
          productivity goals by choosing wake-up, work, meal, and sleep times,
          while adhering to beneficial routines like intermittent fasting and
          relaxation periods for a healthier work-life balance.
        </Text>
        <VStack style={{ flex: 1, maxWidth: 600 }} gap={40}>
          <ScheduleVisualization />
          <ManageSchedule />
          <ScheduleReview />
        </VStack>
      </VStack>
    </OnboardingStepView>
  )
}
