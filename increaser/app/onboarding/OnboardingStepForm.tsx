import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { onboardingStepTargetName, useOnboarding } from './OnboardingProvider'

import { OnboardingPrimaryNavigation } from './OnboardingPrimaryNavigation'
import { Match } from '@lib/ui/base/Match'
import { ProjectsOnboardingStep } from './projects/ProjectsOnboardingStep'
import { WorkBudgetOnboardingStep } from './WorkBudgetOnboardingStep'
import { WeeklyGoalsOnboardingStep } from './WeeklyGoalsOnboardingStep'
import { ScheduleOnboardingStep } from './ScheduleOnboardingStep'
import { DailyHabitsOnboardingStep } from './DailyHabitsOnboardingStep'
import { PublicProfileOnboardingStep } from './PublicProfileOnboardingStep'
import { TasksOnboardingStep } from './TasksOnboardingStep'

const Container = styled(VStack)`
  height: 100%;
  gap: 40px;
`

const Content = styled(VStack)`
  flex: 1;
  overflow-y: auto;
`

export const OnboardingStepForm = () => {
  const { currentStep } = useOnboarding()

  return (
    <Container>
      <Text color="contrast" size={20} weight="bold">
        {onboardingStepTargetName[currentStep]}
      </Text>
      <Content>
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
      </Content>
      <OnboardingPrimaryNavigation />
    </Container>
  )
}
