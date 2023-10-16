import { analytics } from 'analytics'
import { PrimaryGoalOnboarding } from 'capacity/components/PrimaryGoalOnboarding'
import { HabitsOnboarding } from 'habits/components/HabitsOnboarding'
import { GoalsOnboarding } from 'projects/components/GoalsOnboarding'
import { ProjectsOnboarding } from 'projects/components/ProjectsOnboarding'
import { useEffect, useState } from 'react'
import { useAssertUserState } from 'user/state/UserStateContext'

import { WorkHoursOnboarding } from './WorkHoursOnboarding'
import { WorkScheduleOnboarding } from './WorkScheduleOnboarding'
import { Match } from '@increaser/ui/ui/Match'
import { useIsPayingUser } from 'membership/hooks/useIsPayingUser'
import { SubscriptionOnboarding } from 'membership/subscription/components/SubscriptionOnboarding'

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
