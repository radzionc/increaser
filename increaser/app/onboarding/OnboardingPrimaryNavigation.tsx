import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { onboardingSteps, useOnboarding } from './OnboardingProvider'
import { Button } from '@lib/ui/buttons/Button'
import { useRouter } from 'next/router'
import { AppPath } from '@increaser/ui/navigation/AppPath'

const Container = styled(HStack)`
  width: 100%;
  gap: 16px;
  justify-content: flex-end;
`

export const OnboardingPrimaryNavigation = () => {
  const { currentStep, setCurrentStep, isNextStepDisabled } = useOnboarding()

  const { push } = useRouter()

  return (
    <Container>
      {onboardingSteps.indexOf(currentStep) > 0 && (
        <Button
          onClick={() => {
            const previousStep =
              onboardingSteps[onboardingSteps.indexOf(currentStep) - 1]
            if (previousStep) {
              setCurrentStep(previousStep)
            }
          }}
          kind="secondary"
          type="button"
          size="l"
        >
          Back
        </Button>
      )}
      <Button
        onClick={() => {
          const nextStep =
            onboardingSteps[onboardingSteps.indexOf(currentStep) + 1]
          if (nextStep) {
            setCurrentStep(nextStep)
          } else {
            push(AppPath.Home)
          }
        }}
        isDisabled={isNextStepDisabled}
        size="l"
      >
        Next
      </Button>
    </Container>
  )
}
