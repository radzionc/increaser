import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { onboardingStepTargetName, useOnboarding } from './OnboardingProvider'

import { OnboardingPrimaryNavigation } from './OnboardingPrimaryNavigation'
import { OnboardingSection } from './OnboardingSection'
import { OnboardingStepFormContent } from './OnboardingStepFormContent'

const Content = styled(VStack)`
  flex: 1;
  overflow-y: auto;
`

export const OnboardingStepForm = () => {
  const { currentStep } = useOnboarding()

  return (
    <OnboardingSection title={onboardingStepTargetName[currentStep]}>
      <Content>
        <OnboardingStepFormContent />
      </Content>
      <OnboardingPrimaryNavigation />
    </OnboardingSection>
  )
}
