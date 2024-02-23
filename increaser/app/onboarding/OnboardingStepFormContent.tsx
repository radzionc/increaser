import { useOnboarding } from './OnboardingProvider'

import { Match } from '@lib/ui/base/Match'
import { ProjectsOnboardingStep } from './projects/ProjectsOnboardingStep'
import { WorkBudgetOnboardingStep } from './WorkBudgetOnboardingStep'
import { WeeklyGoalsOnboardingStep } from './weeklyGoals/WeeklyGoalsOnboardingStep'
import { ScheduleOnboardingStep } from './ScheduleOnboardingStep'
import { DailyHabitsOnboardingStep } from './DailyHabitsOnboardingStep'
import { PublicProfileOnboardingStep } from './PublicProfileOnboardingStep'
import { TasksOnboardingStep } from './TasksOnboardingStep'

export const OnboardingStepFormContent = () => {
  const { currentStep } = useOnboarding()

  return (
    <Match
      value={currentStep}
      projects={() => <ProjectsOnboardingStep />}
      workBudget={() => <WorkBudgetOnboardingStep />}
      weeklyGoals={() => <WeeklyGoalsOnboardingStep />}
      schedule={() => <ScheduleOnboardingStep />}
      dailyHabits={() => <DailyHabitsOnboardingStep />}
      publicProfile={() => <PublicProfileOnboardingStep />}
      tasks={() => <TasksOnboardingStep />}
    />
  )
}
