import { CuratedHabits } from '../habits/components/CuratedHabits'
import { OnboardingStepView } from './OnboardingStepView'

export const DailyHabitsOnboardingStep = () => {
  return (
    <OnboardingStepView>
      <CuratedHabits />
    </OnboardingStepView>
  )
}
