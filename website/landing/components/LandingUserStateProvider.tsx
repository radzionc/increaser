import { getDemoHabits } from '@increaser/demo/habits'
import { getDemoProjects } from '@increaser/demo/projects'
import { getDemoSets } from '@increaser/demo/sets'
import { getDemoTasks } from '@increaser/demo/tasks'
import { useCallback, useState } from 'react'
import {
  defaultGoalToFinishWorkBy,
  defaultGoalToGoToBedAt,
  defaultGoalToStartWorkAt,
} from 'sets/constants'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { UserStateContext, UserStateView } from 'user/state/UserStateContext'
import { MS_IN_DAY } from '@increaser/utils/time'
import { defaultWeekTimeAllocation } from '@increaser/entities/WeekTimeAllocation'

export enum PreviewUserProject {
  Job = 'Remote job',
  Business = 'Business',
  ProgrammingStudy = 'Learn code',
  Content = 'Content creation',
  Planning = 'Planning',
}

export const LandingUserStateProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const startOfDay = useStartOfDay()

  const [state, setState] = useState<UserStateView>(() => {
    return {
      focusSounds: [],
      primaryGoal: 'awareness',
      sets: getDemoSets(),
      projects: getDemoProjects(),
      email: 'john@mail.com',
      id: 'john',
      name: 'John',
      freeTrialEnd: startOfDay + 10000,
      registrationDate: startOfDay - MS_IN_DAY * 90,
      weekTimeAllocation: defaultWeekTimeAllocation,
      goalToStartWorkAt: defaultGoalToStartWorkAt,
      goalToFinishWorkBy: defaultGoalToFinishWorkBy,
      goalToGoToBedAt: defaultGoalToGoToBedAt,
      isAnonymous: false,
      tasks: getDemoTasks(),
      habits: getDemoHabits(),
      country: 'US',
    }
  })

  const updateState = useCallback((update: Partial<UserStateView>) => {
    setState((state) => ({ ...state, ...update }))
  }, [])

  return (
    <UserStateContext.Provider
      value={{
        state,
        updateState,
        pullRemoteState: () => {},
        isLoading: false,
        lastUpdatedAt: Date.now(),
      }}
    >
      {children}
    </UserStateContext.Provider>
  )
}
