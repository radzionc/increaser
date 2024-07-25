import { HStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { Button } from '@lib/ui/buttons/Button'
import { useRouter } from 'next/router'
import {
  AppPagePlanView,
  appPageViews,
  getAppPath,
} from '@increaser/ui/navigation/app'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { getCurrentPlanDayStep } from './utils/getCurrentPlanDayStep'
import { usePlanDayCompletion } from './hooks/usePlanDayCompletion'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { User } from '@increaser/entities/User'
import { match } from '@lib/utils/match'
import { useMemo } from 'react'
import { useHasOverdueTasks } from '@increaser/ui/tasks/hooks/useHasOverdueTasks'
import { useCurrentPageView } from '../../navigation/hooks/useCurrentPageView'
import { Spacer } from '@lib/ui/layout/Spacer'

const Container = styled(HStack)`
  position: sticky;
  bottom: 0;
  right: 0;
  gap: 16px;
  justify-content: flex-end;
  align-self: end;
`

export const PlanDayPrimaryNavigation = () => {
  const completion = usePlanDayCompletion()

  const { mutate: updateUser } = useUpdateUserMutation()

  const hasOverdueTasks = useHasOverdueTasks()

  const currentStep = useCurrentPageView('plan')

  const { push } = useRouter()

  const currentStepError = useMemo(() => {
    if (currentStep === 'tasks' && hasOverdueTasks) {
      return 'Clear overdue tasks before you can proceed'
    }
  }, [currentStep, hasOverdueTasks])

  return (
    <>
      <Spacer height={80} />
      <Container>
        {(currentStep === null ||
          appPageViews.plan.indexOf(currentStep) > 0) && (
          <Button
            onClick={() => {
              const previousStep =
                currentStep === null
                  ? getLastItem(appPageViews.plan)
                  : appPageViews.plan[
                      appPageViews.plan.indexOf(currentStep) - 1
                    ]
              if (previousStep) {
                push(getAppPath('plan', previousStep))
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
            const updateUserParams = match<AppPagePlanView, Partial<User>>(
              currentStep,
              {
                habits: () => ({ sumbittedHabitsAt: now }),
                goals: () => ({ reviewedGoalsAt: now }),
                tasks: () => ({ organizedTasksAt: now }),
                vision: () => ({ reviewedVisionAt: now }),
              },
            )

            updateUser(updateUserParams)

            const nextStep = getCurrentPlanDayStep({
              ...completion,
              [currentStep]: true,
            })

            if (nextStep === null) {
              push(getAppPath('focus'))
              return
            }

            push(getAppPath('plan', nextStep))
          }}
          size="l"
        >
          {currentStep === getLastItem(appPageViews.plan) ? 'Finish' : 'Next'}
        </Button>
      </Container>
    </>
  )
}
