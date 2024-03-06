import { useOnboarding } from './OnboardingProvider'

import { Match } from '@lib/ui/base/Match'
import { ProjectsOnboardingStep } from './projects/ProjectsOnboardingStep'
import { WorkBudgetOnboardingStep } from './WorkBudgetOnboardingStep'
import { WeeklyGoalsOnboardingStep } from './weeklyGoals/WeeklyGoalsOnboardingStep'
import { ScheduleOnboardingStep } from './ScheduleOnboardingStep'
import { TasksOnboardingStep } from './TasksOnboardingStep'
import { HabitsOnboardingStep } from './habits/HabitsOnboardingStep'
import { FocusOnboardingStep } from './focus/FocusOnboardingStep'

export const OnboardingStepFormContent = () => {
  const { currentStep } = useOnboarding()

  return (
    <Match
      value={currentStep}
      projects={() => <ProjectsOnboardingStep />}
      workBudget={() => <WorkBudgetOnboardingStep />}
      weeklyGoals={() => <WeeklyGoalsOnboardingStep />}
      schedule={() => <ScheduleOnboardingStep />}
      dailyHabits={() => <HabitsOnboardingStep />}
      tasks={() => <TasksOnboardingStep />}
      focus={() => <FocusOnboardingStep />}
    />
  )
}
