import { getDemoHabits } from 'demo/habits'
import { getDemoProjects } from 'demo/projects'
import { getDemoSets } from 'demo/sets'
import { getDemoTasks } from 'demo/tasks'
import { useCallback, useState } from 'react'
import {
  defaultGoalToFinishWorkBy,
  defaultGoalToGoToBedAt,
  defaultGoalToStartWorkAt,
} from 'sets/constants'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from 'shared/props'
import { UserStateContext, UserStateView } from 'user/state/UserStateContext'
import { MS_IN_DAY } from 'utils/time'
import { getWeekTimeAllocation } from 'weekTimeAllocation/helpers/getWeekTimeAllocation'
import {
  defaultWeekendMinutes,
  defaultWorkdayMinutes,
} from 'weekTimeAllocation/WeekTimeAllocation'

export enum PreviewUserProject {
  Job = 'Remote job',
  Business = 'Business',
  ProgrammingStudy = 'Learn code',
  Content = 'Content creation',
  Planning = 'Planning',
}

function updateRemoteState<T>(): Promise<T> {
  return Promise.resolve(undefined as unknown as T)
}

export const LandingUserStateProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const startOfDay = useStartOfDay()

  const [state, setState] = useState<UserStateView>(() => {
    return {
      focusSounds: [],
      prevSets: [],
      primaryGoal: 'awareness',
      sets: getDemoSets(),
      projects: getDemoProjects(),
      email: 'john@mail.com',
      id: 'john',
      name: 'John',
      freeTrialEnd: startOfDay + 10000,
      registrationDate: startOfDay - MS_IN_DAY * 90,
      weekTimeAllocation: getWeekTimeAllocation(
        defaultWorkdayMinutes,
        defaultWeekendMinutes,
      ),
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
        updateRemoteState,
      }}
    >
      {children}
    </UserStateContext.Provider>
  )
}
