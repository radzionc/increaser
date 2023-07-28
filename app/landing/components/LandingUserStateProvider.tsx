import { habitRecord } from 'habits/data/habits'
import { toHabitDate } from 'habits/utils/toHabitDate'
import { getMockSets } from 'mocks/sets'
import { weeksToDisplay } from 'projects/components/ProjectsProvider'
import { ProjectResponse, ProjectStatus } from 'projects/Project'
import { useCallback, useState } from 'react'
import {
  defaultGoalToFinishWorkBy,
  defaultGoalToGoToBedAt,
  defaultGoalToStartWorkAt,
} from 'sets/constants'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { useStartOfWeek } from 'shared/hooks/useStartOfWeek'
import { ComponentWithChildrenProps } from 'shared/props'
import { getId } from 'shared/utils/getId'
import { range } from 'shared/utils/range'
import { toWeek } from 'shared/utils/toWeek'
import { UserStateContext, UserStateView } from 'user/state/UserStateContext'
import {
  MIN_IN_HOUR,
  MS_IN_DAY,
  MS_IN_SEC,
  MS_IN_WEEK,
  S_IN_HOUR,
} from 'utils/time'
import { getWeekTimeAllocation } from 'weekTimeAllocation/helpers/getWeekTimeAllocation'
import {
  defaultWeekendMinutes,
  defaultWorkdayMinutes,
} from 'weekTimeAllocation/WeekTimeAllocation'

const defaultProjectParams = {
  status: ProjectStatus.Active,
  total: 0,
  allocatedMinutesPerWeek: 0,
}

export enum MockProjectId {
  Job = 'job',
  Business = 'business',
  DesignStudy = 'design-study',
  ProgrammingStudy = 'programming-study',
  Content = 'content',
  Music = 'music',
  Planning = 'planning',
  Language = 'spanish',
  Research = 'research',
}

function updateRemoteState<T>(): Promise<T> {
  return Promise.resolve(undefined as unknown as T)
}

const generateHabitSuccesses = (days: number, rate: number) => {
  const today = Date.now()
  return range(days).reduce((acc, index) => {
    if (index < 3 || Math.random() > 1 - rate) {
      acc.push(toHabitDate(new Date(today - index * MS_IN_DAY)))
    }

    return acc
  }, [] as string[])
}

export const LandingUserStateProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const startOfDay = useStartOfDay()
  const startOfWeek = useStartOfWeek()

  const allocatedMockProjects: ProjectResponse[] = [
    {
      ...defaultProjectParams,
      id: MockProjectId.Job,
      name: 'Remote job',
      color: 0,
      emoji: '👨‍💻',
      total: 620 * S_IN_HOUR,
      months: [],
      weeks: [
        {
          ...toWeek(startOfWeek - weeksToDisplay * MS_IN_WEEK),
          seconds: 24 * S_IN_HOUR,
        },
        {
          ...toWeek(startOfWeek - (weeksToDisplay - 1) * MS_IN_WEEK),
          seconds: 21 * S_IN_HOUR,
        },
        {
          ...toWeek(startOfWeek - (weeksToDisplay - 2) * MS_IN_WEEK),
          seconds: 19 * S_IN_HOUR,
        },
        {
          ...toWeek(startOfWeek - (weeksToDisplay - 3) * MS_IN_WEEK),
          seconds: 18 * S_IN_HOUR,
        },
      ],
    },
    {
      ...defaultProjectParams,
      id: MockProjectId.Business,
      name: 'Online Business',
      color: 7,
      emoji: '🤑',
      allocatedMinutesPerWeek: 5 * MIN_IN_HOUR,
      months: [],
      weeks: [],
    },
    {
      ...defaultProjectParams,
      id: MockProjectId.ProgrammingStudy,
      name: 'Study code',
      color: 9,
      emoji: '🦄',
      allocatedMinutesPerWeek: 2 * MIN_IN_HOUR,
      months: [],
      weeks: [],
    },
    {
      ...defaultProjectParams,
      id: MockProjectId.Content,
      name: 'Content Creation',
      color: 3,
      emoji: '🎥',
      allocatedMinutesPerWeek: 2 * MIN_IN_HOUR,
      months: [],
      weeks: [],
    },
    {
      ...defaultProjectParams,
      id: MockProjectId.Language,
      name: 'Spanish',
      color: 4,
      emoji: '🇪🇸',
      allocatedMinutesPerWeek: 2 * MIN_IN_HOUR,
      months: [],
      weeks: [],
    },
  ]
  const mockProjects: ProjectResponse[] = [
    ...allocatedMockProjects,
    {
      ...defaultProjectParams,
      id: MockProjectId.Planning,
      name: 'Planning',
      color: 5,
      emoji: '📅',
      months: [],
      weeks: [],
    },
    {
      ...defaultProjectParams,
      id: MockProjectId.Research,
      name: 'Research',
      color: 6,
      emoji: '🔬',
      months: [],
      weeks: [],
    },
  ]

  const [state, setState] = useState<UserStateView>(() => {
    const goalDays = 60
    const goalStartedAt = (startOfDay - MS_IN_DAY * goalDays) / MS_IN_SEC
    return {
      focusSounds: [],
      prevSets: [],
      primaryGoal: 'workMore',
      sets: getMockSets(),
      projects: mockProjects,
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
      tasks: [],
      habits: [
        {
          ...habitRecord.sunlight,
          color: 3,
          id: getId(),
          startedAt: goalStartedAt,
          successes: generateHabitSuccesses(goalDays, 0.9),
          order: 0,
        },
        {
          ...habitRecord.morningFast,
          color: 5,
          id: getId(),
          startedAt: goalStartedAt,
          successes: generateHabitSuccesses(goalDays, 0.8),
          order: 1,
        },
        {
          ...habitRecord.limitCoffee,
          color: 10,
          id: getId(),
          startedAt: goalStartedAt,
          successes: generateHabitSuccesses(goalDays, 0.8),
          order: 2,
        },
        {
          ...habitRecord.exercise,
          color: 12,
          id: getId(),
          startedAt: goalStartedAt,
          successes: generateHabitSuccesses(goalDays, 0.7),
          order: 3,
        },
      ],
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
