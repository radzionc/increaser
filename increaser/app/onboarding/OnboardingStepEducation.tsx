import { Match } from '@lib/ui/base/Match'
import { OnboardingStep, useOnboarding } from './OnboardingProvider'
import { Text } from '@lib/ui/text'
import { OnboardingSection } from './OnboardingSection'
import { OnboardingVideo } from './OnboardingVideo'
import { CuratedHabits } from '../habits/components/CuratedHabits'
import { VStack } from '@lib/ui/layout/Stack'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { Scoreboard } from '@increaser/ui/scoreboard/Scoreboard'

const onboardingStepTitle: Record<OnboardingStep, string> = {
  projects: 'Identify Your Key Projects to Track in Increaser',
  workBudget: 'Balance Your Week with a Custom Work Budget',
  weeklyGoals: 'Allocate Weekly Hours to Reach Your Project Goals',
  schedule: 'Design Your Day for Optimal Health and Productivity',
  dailyHabits: 'Build a Foundation of Daily Habits for Lasting Well-being',
  publicProfile: 'Join the Community with a Public Profile',
  tasks: 'Elevate Your Day with Priority Tasks at a Glance',
}

export const OnboardingStepEducation = () => {
  const { currentStep } = useOnboarding()
  return (
    <OnboardingSection title={onboardingStepTitle[currentStep]}>
      <SeparatedByLine gap={28}>
        <VStack gap={28}>
          <OnboardingVideo />
          <Text weight="semibold" height="large">
            <Match
              value={currentStep}
              projects={() => (
                <>
                  Begin by adding projects that represent your focused
                  endeavors, such as studying, remote work, freelancing, or
                  business projects. This initial step is crucial as it allows
                  you to organize your work sessions, providing clarity and
                  structure to your day. By categorizing your activities, you'll
                  be able to analyze your time allocation and identify areas for
                  improvement, ultimately enhancing your productivity in tasks
                  that demand concentration. Go ahead and add your primary
                  focused activities now, and keep in mind, you can always
                  introduce more projects later!
                </>
              )}
              workBudget={() => (
                <>
                  Define your work week by establishing a customized work
                  budget, creating harmony between professional and personal
                  time. Decide on your work hours for weekdays and weekends,
                  fostering a routine that maintains focus and promotes overall
                  well-being. This deliberate approach enables you to prioritize
                  your time and energy effectively. Set your work budget now to
                  take charge of your schedule and enhance your productivity.
                </>
              )}
              weeklyGoals={() => (
                <>
                  Establish weekly goals for key projects where increased effort
                  will be most impactful. This approach encourages targeted
                  dedication and helps in tracking significant progress on the
                  projects that truly benefit from extra attention.
                </>
              )}
              schedule={() => (
                <>
                  Customize your daily schedule to align with your health and
                  productivity goals by choosing wake-up, work, meal, and sleep
                  times, while adhering to beneficial routines like intermittent
                  fasting and relaxation periods for a healthier work-life
                  balance.
                </>
              )}
              dailyHabits={() => (
                <>
                  Choose from a variety of daily habits to build and track,
                  aiming to improve your overall well-being and productivity. By
                  establishing and monitoring these habits, Increaser helps you
                  create a more structured and fulfilling daily routine.
                </>
              )}
              publicProfile={() => (
                <>
                  Decide how you want to be represented on the leaderboard: stay
                  anonymous or showcase your name and country. This step
                  determines your visibility among Increaser’s community of
                  productive users.
                </>
              )}
              tasks={() => (
                <>
                  Keep your focus razor-sharp with Increaser's task
                  organization. By adding your key tasks to the designated
                  sections for today, tomorrow, this week, and next week, you
                  prioritize your workflow and ensure nothing important falls
                  through the cracks. It's not just about listing tasks; it's
                  about creating a strategic plan that aligns with your
                  productivity goals. Take a moment to sort your tasks and
                  maintain clarity as you navigate your workweek.
                </>
              )}
            />
          </Text>
        </VStack>
        <Match
          value={currentStep}
          projects={() => null}
          workBudget={() => null}
          weeklyGoals={() => null}
          schedule={() => null}
          dailyHabits={() => (
            <VStack gap={28}>
              <Text color="shy" weight="bold">
                Habit ideas
              </Text>
              <CuratedHabits />
            </VStack>
          )}
          publicProfile={() => <Scoreboard />}
          tasks={() => null}
        />
      </SeparatedByLine>
    </OnboardingSection>
  )
}
