import { OnboardingOverview } from './OnboardingOverview'
import { OnboardingStepEducation } from './OnboardingStepEducation'
import { OnboardingStepForm } from './OnboardingStepForm'
import { ComprehensiveOnboardingContainer } from '@lib/ui/onboarding/ComprehensiveOnboardingContainer'

export const NormalScreenOnboarding = () => (
  <ComprehensiveOnboardingContainer>
    <OnboardingOverview />
    <OnboardingStepForm />
    <OnboardingStepEducation />
  </ComprehensiveOnboardingContainer>
)
