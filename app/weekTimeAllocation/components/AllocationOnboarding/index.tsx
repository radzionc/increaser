import { trackEvent } from 'analytics'
import { PrimaryGoalOnboarding } from 'capacity/components/PrimaryGoalOnboarding'
import { HabitsOnboarding } from 'habits/components/HabitsOnboarding'
import { GoalsOnboarding } from 'projects/components/GoalsOnboarding'
import { ProjectsOnboarding } from 'projects/components/ProjectsOnboarding'
import { useEffect, useState } from 'react'
import { useAssertUserState } from 'user/state/UserStateContext'

import { WorkHoursOnboarding } from './WorkHoursOnboarding'
import { WorkScheduleOnboarding } from './WorkScheduleOnboarding'
import { Match } from '@increaser/ui/ui/Match'

type AllocationOnboardingStage =
  | 'goal'
  | 'allocation'
  | 'projects'
  | 'goals'
  | 'schedule'
  | 'habits'

export const AllocationOnboarding = () => {
  const [stage, setStage] = useState<AllocationOnboardingStage | null>(null)

  const { name, projects } = useAssertUserState()

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
          onNext={() => {
            trackEvent('Finish primary goal onboarding')
            setStage('allocation')
          }}
        />
      )}
      allocation={() => (
        <WorkHoursOnboarding
          onNext={() => {
            trackEvent('Finish work hours onboarding')
            setStage('projects')
          }}
        />
      )}
      projects={() => (
        <ProjectsOnboarding
          onBack={() => setStage('allocation')}
          onNext={() => {
            trackEvent('Finish projects onboarding')
            setStage('goals')
          }}
        />
      )}
      goals={() => (
        <GoalsOnboarding
          onNext={() => {
            trackEvent('Finish goals onboarding')
            setStage('schedule')
          }}
        />
      )}
      schedule={() => (
        <WorkScheduleOnboarding
          onNext={() => {
            trackEvent('Finish schedule onboarding')
            setStage('habits')
          }}
        />
      )}
      habits={() => (
        <HabitsOnboarding
          onNext={() => {
            trackEvent('Finish habits onboarding')
            setStage(null)
          }}
        />
      )}
    />
  )
}
