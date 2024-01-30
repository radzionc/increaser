import { Match } from '@lib/ui/base/Match'
import { useOnboarding } from './OnboardingProvider'
import { Text } from '@lib/ui/text'

export const OnboardingStepEducation = () => {
  const { currentStep } = useOnboarding()
  return (
    <Text weight="semibold" size={18} height="large">
      <Match
        value={currentStep}
        projects={() => (
          <>
            Begin by adding projects to track various work activities such as
            studying, remote work, freelancing, business, and more. This step is
            essential to effectively monitor and analyze your productivity
            across different types of work.
          </>
        )}
        workBudget={() => (
          <>
            Set your work budget by selecting the desired number of working
            hours for weekdays and weekends. This ensures a balanced approach to
            managing your time and commitments effectively.
          </>
        )}
        weeklyGoals={() => (
          <>
            Establish weekly goals for key projects where increased effort will
            be most impactful. This approach encourages targeted dedication and
            helps in tracking significant progress on the projects that truly
            benefit from extra attention.
          </>
        )}
        schedule={() => (
          <>
            Customize your daily schedule to align with your health and
            productivity goals by choosing wake-up, work, meal, and sleep times,
            while adhering to beneficial routines like intermittent fasting and
            relaxation periods for a healthier work-life balance.
          </>
        )}
        dailyHabits={() => (
          <>
            Choose from a variety of daily habits to build and track, aiming to
            improve your overall well-being and productivity. By establishing
            and monitoring these habits, Increaser helps you create a more
            structured and fulfilling daily routine.
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
  )
}
