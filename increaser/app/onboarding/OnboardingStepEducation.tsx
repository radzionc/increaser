import { Match } from '@lib/ui/base/Match'
import { useOnboarding } from './OnboardingProvider'
import { Text } from '@lib/ui/text'
import { OnboardingSection } from './OnboardingSection'
import { OnboardingVideo } from './OnboardingVideo'
import { CuratedHabits } from '../habits/components/CuratedHabits'
import { VStack } from '@lib/ui/layout/Stack'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { OnboardingStep } from './OnboardingStep'
import { CuratedVisionAttributes } from './vision/CuratedVisionAttributes'

const onboardingStepTitle: Record<OnboardingStep, string> = {
  projects: 'Identify Your Key Projects to Track in Increaser',
  workBudget: 'Balance Your Week with a Custom Work Budget',
  projectsBudget: 'Strategize Your Week by Budgeting Time for Key Projects',
  schedule: 'Design Your Day for Optimal Health and Productivity',
  dailyHabits: 'Build a Foundation of Daily Habits for Lasting Well-being',
  tasks: 'Elevate Your Day with Priority Tasks at a Glance',
  focus: 'Boost Your Focus with Targeted Work Sessions',
  vision: 'Describe Your Vision for a Perfect Life',
  goals: 'Set Your Goals for Success',
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
                  Add projects that represent your focused endeavors, such as
                  studying, remote work, freelancing, or business projects. This
                  step allows you to organize your work sessions, providing
                  clarity and structure to your day. By categorizing your
                  activities, you'll be able to analyze your time allocation and
                  identify areas for improvement, ultimately enhancing your
                  productivity. Add your primary focused activities now, and
                  remember, you can always introduce more projects later!
                </>
              )}
              workBudget={() => (
                <>
                  Establish a customized work budget to create harmony between
                  professional and personal time. Decide on your work hours for
                  weekdays and weekends, fostering a routine that maintains
                  focus and promotes overall well-being. This approach enables
                  you to prioritize your time and energy effectively. Set your
                  work budget now to take control of your schedule and enhance
                  your productivity.
                </>
              )}
              projectsBudget={() => (
                <>
                  Smartly allocate your time among various commitments, whether
                  they involve work, study, or personal projects. Set minimum
                  hours to ensure steady progress on key areas like growing your
                  business, or establish maximum hours to maintain balance and
                  prevent overload. This method helps you prioritize
                  effectively, ensuring you invest your time where it benefits
                  you most. Start setting your project budgets now to balance
                  your activities and advance towards your goals.
                </>
              )}
              schedule={() => (
                <>
                  Customize your daily schedule to align with your health and
                  productivity goals. Choose wake-up, work, meal, and sleep
                  times, and incorporate beneficial routines like intermittent
                  fasting and relaxation periods. This helps you achieve a
                  healthier work-life balance and optimize your daily routine
                  for maximum productivity.
                </>
              )}
              dailyHabits={() => (
                <>
                  Select from a variety of daily habits to build and track,
                  aiming to improve your overall well-being and productivity. By
                  establishing and monitoring these habits, Increaser helps you
                  create a structured and fulfilling daily routine, supporting
                  lasting positive changes in your life.
                </>
              )}
              tasks={() => (
                <>
                  Organize your tasks with Increaser's task management system.
                  By adding key tasks to sections for today, tomorrow, this
                  week, and next week, you prioritize your workflow and ensure
                  nothing important is overlooked. It's not just about listing
                  tasks; it's about creating a strategic plan that aligns with
                  your productivity goals. Sort your tasks now to maintain
                  clarity and focus as you navigate your workweek.
                </>
              )}
              focus={() => (
                <VStack gap={8}>
                  <Text>
                    Enhance your productivity with focused work sessions.
                    According to Andrew Huberman, the optimal duration for
                    focused work is around 90 minutes. While you can improve
                    focus through different protocols, quality sleep, and
                    consistent physical activities, most of us are limited to
                    two or three 90-minute blocks of deep work a day. Attempting
                    more may lead to diminishing returns in productivity.
                  </Text>
                  <Text>
                    You can divide the 90-minute block into shorter sessions
                    with small breaks or complete it in one go. After such a
                    block, have quality decompression time for at least 30
                    minutes, doing activities like cleaning, cooking, or
                    exercising, and avoid using the phone or checking social
                    media.
                  </Text>
                  <Text>
                    A useful scheduling technique to finish work early is to do
                    a 90-minute block before breakfast and one after. This also
                    provides health benefits from intermittent fasting by
                    delaying your first meal of the day.
                  </Text>
                </VStack>
              )}
              vision={() => (
                <>
                  Define your vision for a perfect life by adding specific
                  attributes like "Happy marriage," "Fit body," or "Financial
                  independence." Each attribute can be marked as done,
                  maintenance, in progress, or to-do. Enhance your motivation
                  and focus by attaching images to these attributes, making your
                  aspirations more tangible and guiding you toward achieving
                  your ideal lifestyle.
                </>
              )}
              goals={() => (
                <>
                  Set your goals to provide clear direction and purpose in your
                  journey. Define specific, measurable, and time-bound goals
                  that align with your vision. By setting clear objectives, you
                  create a roadmap for your personal and professional growth,
                  making it easier to track progress and stay motivated.
                  Establish your goals now to turn your aspirations into
                  achievable milestones.
                </>
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
          vision={() => (
            <VStack gap={28}>
              <Text color="shy" weight="bold">
                Life aspiration ideas
              </Text>
              <CuratedVisionAttributes />
            </VStack>
          )}
          goals={() => null}
        />
      </SeparatedByLine>
    </OnboardingSection>
  )
}
