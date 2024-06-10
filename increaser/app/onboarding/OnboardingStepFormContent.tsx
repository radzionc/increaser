import { useOnboarding } from './OnboardingProvider'

import { Match } from '@lib/ui/base/Match'
import { ProjectsOnboardingStep } from './projects/ProjectsOnboardingStep'
import { ScheduleOnboardingStep } from './ScheduleOnboardingStep'
import { TasksOnboardingStep } from './TasksOnboardingStep'
import { HabitsOnboardingStep } from './habits/HabitsOnboardingStep'
import { FocusOnboardingStep } from './focus/FocusOnboardingStep'
import { ManageWorkBudget } from '@increaser/ui/workBudget/ManageWorkBudget'
import { ProjectsBudgetOnboardingStep } from './projectsBudget/ProjectsBudgetOnboardingStep'
import { VStack } from '@lib/ui/layout/Stack'
import { VisionOnboardingStep } from './vision/VisionOnboardingStep'
import { GoalsOnboardingStep } from './goals/GoalsOnboardingStep'

export const OnboardingStepFormContent = () => {
  const { currentStep } = useOnboarding()

  return (
    <Match
      value={currentStep}
      projects={() => <ProjectsOnboardingStep />}
      workBudget={() => (
        <VStack style={{ maxWidth: 440 }}>
          <ManageWorkBudget />
        </VStack>
      )}
      projectsBudget={() => <ProjectsBudgetOnboardingStep />}
      schedule={() => <ScheduleOnboardingStep />}
      dailyHabits={() => <HabitsOnboardingStep />}
      tasks={() => <TasksOnboardingStep />}
      focus={() => <FocusOnboardingStep />}
      vision={() => <VisionOnboardingStep />}
      goals={() => <GoalsOnboardingStep />}
    />
  )
}
