import { useOnboarding } from './OnboardingProvider'

import { Match } from '@lib/ui/base/Match'
import { ScheduleOnboardingStep } from './ScheduleOnboardingStep'
import { TasksOnboardingStep } from './TasksOnboardingStep'
import { FocusOnboardingStep } from './focus/FocusOnboardingStep'
import { ManageWorkBudget } from '@increaser/ui/workBudget/ManageWorkBudget'
import { ProjectsBudgetOnboardingStep } from './projectsBudget/ProjectsBudgetOnboardingStep'
import { VStack } from '@lib/ui/layout/Stack'
import { GoalsOnboardingStep } from './goals/GoalsOnboardingStep'
import { ManageProjects } from '@increaser/ui/projects/ManageProjects'
import { ManageHabits } from '../habits/components/manage/ManageHabits'
import { MyVision } from '../vision/MyVision'

export const OnboardingStepFormContent = () => {
  const { currentStep } = useOnboarding()

  return (
    <Match
      value={currentStep}
      projects={() => <ManageProjects />}
      workBudget={() => (
        <VStack style={{ maxWidth: 440 }}>
          <ManageWorkBudget />
        </VStack>
      )}
      projectsBudget={() => <ProjectsBudgetOnboardingStep />}
      schedule={() => <ScheduleOnboardingStep />}
      dailyHabits={() => <ManageHabits />}
      tasks={() => <TasksOnboardingStep />}
      focus={() => <FocusOnboardingStep />}
      vision={() => <MyVision />}
      goals={() => <GoalsOnboardingStep />}
    />
  )
}
