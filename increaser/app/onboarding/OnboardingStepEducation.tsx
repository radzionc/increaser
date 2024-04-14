import { Match } from '@lib/ui/base/Match'
import { useOnboarding } from './OnboardingProvider'
import { Text } from '@lib/ui/text'
import { OnboardingSection } from './OnboardingSection'
import { OnboardingVideo } from './OnboardingVideo'
import { CuratedHabits } from '../habits/components/CuratedHabits'
import { VStack } from '@lib/ui/layout/Stack'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { OnboardingStep } from './OnboardingStep'

const onboardingStepTitle: Record<OnboardingStep, string> = {
  projects: 'Identify Your Key Projects to Track in Increaser',
  workBudget: 'Balance Your Week with a Custom Work Budget',
  projectsBudget: 'Strategize Your Week by Budgeting Time for Key Projects',
  schedule: 'Design Your Day for Optimal Health and Productivity',
  dailyHabits: 'Build a Foundation of Daily Habits for Lasting Well-being',
  tasks: 'Elevate Your Day with Priority Tasks at a Glance',
  focus: 'Boost Your Focus with Targeted Work Sessions',
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
              projectsBudget={() => (
                <>
                  Take control of your week by smartly allocating time among
                  your various commitments, whether they involve work, study, or
                  personal projects. Set minimum hours to ensure steady progress
                  on key areas like growing your business, or establish maximum
                  hours to maintain balance and prevent overload. This method
                  helps you prioritize effectively, ensuring you invest your
                  time where it benefits you most. Start setting your project
                  budgets and goals now to masterfully balance your diverse
                  activities and advance towards your goals.
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
              focus={() => (
                <VStack gap={8}>
                  <Text>
                    According to Andrew Huberman, the best duration for focused
                    work is around 90 minutes. While you can improve your
                    ability to focus through different protocols, quality sleep,
                    and consistent physical activities, most of us are limited
                    to two or three 90 minutes blocks of deep work a day. Try
                    doing more than that, and you'll quickly experience
                    diminishing returns in productivity.
                  </Text>
                  <Text>
                    You can divide the 90-minute block into a few sessions with
                    small breaks or do it in one go. After one such block of
                    work, it's good to have quality decompression time for at
                    least 30 minutes where you are not focusing on anything
                    specific and give your mind quality recovery time, e.g.
                    cleaning, cooking, or exercising, but try to escape using
                    the phone or checking social media.
                  </Text>
                  <Text>
                    An easy scheduling technique to consistently finish work
                    early is to do 90 minutes block before breakfast and one
                    after. That way, you will also get health benefits from
                    intermittent fasting by pushing the first meal to later in
                    the day.
                  </Text>
                </VStack>
              )}
            />
          </Text>
        </VStack>
        <Match
          value={currentStep}
          projects={() => null}
          workBudget={() => null}
          projectsBudget={() => null}
          schedule={() => null}
          dailyHabits={() => (
            <VStack gap={28}>
              <Text color="shy" weight="bold">
                Habit ideas
              </Text>
              <CuratedHabits />
            </VStack>
          )}
          tasks={() => null}
          focus={() => null}
        />
      </SeparatedByLine>
    </OnboardingSection>
  )
}
