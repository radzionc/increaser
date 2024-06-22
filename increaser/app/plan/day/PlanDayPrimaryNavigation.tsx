import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { Button } from '@lib/ui/buttons/Button'
import { useRouter } from 'next/router'
import { getAppPath } from '@increaser/ui/navigation/app'
import { usePlanDay } from './state/PlanDayContext'
import { PlanDayStep, planDaySteps } from './PlanDayStep'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { getCurrentPlanDayStep } from './utils/getCurrentPlanDayStep'
import { usePlanDayCompletion } from './hooks/usePlanDayCompletion'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { User } from '@increaser/entities/User'
import { match } from '@lib/utils/match'

const Container = styled(HStack)`
  width: 100%;
  gap: 16px;
  justify-content: flex-end;
`

export const PlanDayPrimaryNavigation = () => {
  const { currentStep, setCurrentStep, currentStepError } = usePlanDay()
  const completion = usePlanDayCompletion()

  const { mutate: updateUser } = useUpdateUserMutation()

  const { push } = useRouter()

  return (
    <Container>
      {(currentStep === null || planDaySteps.indexOf(currentStep) > 0) && (
        <Button
          onClick={() => {
            const previousStep =
              currentStep === null
                ? getLastItem(planDaySteps)
                : planDaySteps[planDaySteps.indexOf(currentStep) - 1]
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
        isDisabled={currentStepError}
        onClick={() => {
          if (currentStep === null) {
            push(getAppPath('focus'))
            return
          }

          const now = Date.now()
          const updateUserParams = match<PlanDayStep, Partial<User>>(
            currentStep,
            {
              habits: () => ({ sumbittedHabitsAt: now }),
              goals: () => ({ reviewedGoalsAt: now }),
              tasks: () => ({ organizedTasksAt: now }),
            },
          )

          updateUser(updateUserParams)

          const nextStep = getCurrentPlanDayStep({
            ...completion,
            [currentStep]: true,
          })

          setCurrentStep(nextStep)
        }}
        size="l"
      >
        {currentStep === getLastItem(planDaySteps) ? 'Finish' : 'Next'}
      </Button>
    </Container>
  )
}
