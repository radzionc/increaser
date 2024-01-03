import { analytics } from '@increaser/app/analytics'
import { PrimaryGoalOnboarding } from '@increaser/app/capacity/components/PrimaryGoalOnboarding'
import { HabitsOnboarding } from '@increaser/app/habits/components/HabitsOnboarding'
import { GoalsOnboarding } from '@increaser/app/projects/components/GoalsOnboarding'
import { ProjectsOnboarding } from '@increaser/app/projects/components/ProjectsOnboarding'
import { useEffect, useState } from 'react'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

import { WorkHoursOnboarding } from './WorkHoursOnboarding'
import { WorkScheduleOnboarding } from './WorkScheduleOnboarding'
import { Match } from '@lib/ui/base/Match'
import { useIsPayingUser } from '@increaser/app/membership/hooks/useIsPayingUser'
import { SubscriptionOnboarding } from '@increaser/app/membership/subscription/components/SubscriptionOnboarding'

type AllocationOnboardingStage =
  | 'goal'
  | 'allocation'
  | 'projects'
  | 'goals'
  | 'schedule'
  | 'habits'
  | 'sale'

export const AllocationOnboarding = () => {
  const [stage, setStage] = useState<AllocationOnboardingStage | null>(null)

  const { name, projects } = useAssertUserState()

  const isPayingUser = useIsPayingUser()

  useEffect(() => {
    if (projects.length === 0 && name && stage === null) {
      setStage('goal')
    }
  }, [name, projects.length, stage])

  if (!stage) {
    return null
  }

  return (
    <Match
      value={stage}
      goal={() => (
        <PrimaryGoalOnboarding
          onClose={() => setStage(null)}
          onNext={() => {
            analytics.trackEvent('Finish primary goal onboarding')
            setStage('allocation')
          }}
        />
      )}
      allocation={() => (
        <WorkHoursOnboarding
          onClose={() => setStage(null)}
          onNext={() => {
            analytics.trackEvent('Finish work hours onboarding')
            setStage('projects')
          }}
        />
      )}
      projects={() => (
        <ProjectsOnboarding
          onBack={() => setStage('allocation')}
          onClose={() => setStage(null)}
          onNext={() => {
            analytics.trackEvent('Finish projects onboarding')
            setStage('goals')
          }}
        />
      )}
      goals={() => (
        <GoalsOnboarding
          onClose={() => setStage(null)}
          onNext={() => {
            analytics.trackEvent('Finish goals onboarding')
            setStage('schedule')
          }}
        />
      )}
      schedule={() => (
        <WorkScheduleOnboarding
          onClose={() => setStage(null)}
          onNext={() => {
            analytics.trackEvent('Finish schedule onboarding')
            setStage('habits')
          }}
        />
      )}
      habits={() => (
        <HabitsOnboarding
          onClose={() => setStage(null)}
          onNext={() => {
            analytics.trackEvent('Finish habits onboarding')
            setStage(isPayingUser ? null : 'sale')
          }}
        />
      )}
      sale={() => (
        <SubscriptionOnboarding
          onClose={() => setStage(null)}
          onNext={() => {
            analytics.trackEvent('Finish sale onboarding')
            setStage(null)
          }}
        />
      )}
    />
  )
}
