import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { onboardingSteps, useOnboarding } from './OnboardingProvider'
import { Button } from '@lib/ui/buttons/Button'
import { useRouter } from 'next/router'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import { useUpdateUserMutation } from '../user/mutations/useUpdateUserMutation'
import { analytics } from '../analytics'
import { match } from '@lib/utils/match'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { OnboardingStep } from './OnboardingProvider'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

const Container = styled(HStack)`
  width: 100%;
  gap: 16px;
  justify-content: flex-end;
`

export const OnboardingPrimaryNavigation = () => {
  const { currentStep, setCurrentStep } = useOnboarding()
  const { push } = useRouter()

  const { mutate: updateUser } = useUpdateUserMutation()

  const { activeProjects } = useProjects()

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
            analytics.trackEvent('Finished onboarding')
            updateUser({ finishedOnboardingAt: Date.now() })
          }
        }}
        isDisabled={match<OnboardingStep, string | false>(currentStep, {
          projects: () =>
            isEmpty(activeProjects)
              ? 'You need to create at least one project'
              : false,
          workBudget: () => false,
          weeklyGoals: () => false,
          schedule: () => false,
          dailyHabits: () => false,
          publicProfile: () => false,
          tasks: () => false,
        })}
        size="l"
      >
        Next
      </Button>
    </Container>
  )
}
