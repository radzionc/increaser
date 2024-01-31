import { Match } from '@lib/ui/base/Match'
import { OnboardingStep, useOnboarding } from './OnboardingProvider'
import { Text } from '@lib/ui/text'
import { OnboardingSection } from './OnboardingSection'

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
      <Text weight="semibold" size={18} height="large">
        <Match
          value={currentStep}
          projects={() => (
            <>
              Begin by adding projects to track various work activities such as
              studying, remote work, freelancing, business, and more. This step
              is essential to effectively monitor and analyze your productivity
              across different types of work.
            </>
          )}
          workBudget={() => (
            <>
              Set your work budget by selecting the desired number of working
              hours for weekdays and weekends. This ensures a balanced approach
              to managing your time and commitments effectively.
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
              fasting and relaxation periods for a healthier work-life balance.
            </>
          )}
          dailyHabits={() => (
            <>
              Choose from a variety of daily habits to build and track, aiming
              to improve your overall well-being and productivity. By
              establishing and monitoring these habits, Increaser helps you
              create a more structured and fulfilling daily routine.
            </>
          )}
          publicProfile={() => (
            <>
              Decide how you want to be represented on the leaderboard: stay
              anonymous or showcase your name and country. This step determines
              your visibility among Increaser’s community of productive users.
            </>
          )}
          tasks={() => (
            <>
              Add your most important tasks for the day to keep them front and
              center on your homepage, ensuring you stay focused on your top
              priorities.
            </>
          )}
        />
      </Text>
    </OnboardingSection>
  )
}
