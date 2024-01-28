import { VStack } from '@lib/ui/layout/Stack'
import { OnboardingStepView } from './OnboardingStepView'
import { ScheduleVisualization } from '@increaser/ui/schedule/ScheduleVisualization'
import { ManageSchedule } from '@increaser/ui/schedule/ManageSchedule'
import { ScheduleReview } from '../sets/components/ScheduleReview'

export const ScheduleOnboardingStep = () => {
  return (
    <OnboardingStepView>
      <VStack style={{ flex: 1, maxWidth: 600 }} gap={40}>
        <ScheduleVisualization />
        <ManageSchedule />
        <ScheduleReview />
      </VStack>
    </OnboardingStepView>
  )
}
