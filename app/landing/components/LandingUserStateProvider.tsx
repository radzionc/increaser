import { subDays, set } from 'date-fns'
import { habitRecord } from 'habits/data/habits'
import { toHabitDate } from 'habits/utils/toHabitDate'
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
import { getWeekday } from 'shared/utils/getWeekday'
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

  const projects: ProjectResponse[] = [
    {
      ...defaultProjectParams,
      id: PreviewUserProject.Job,
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
      id: PreviewUserProject.Business,
      name: 'Online Business',
      color: 7,
      emoji: '🤑',
      allocatedMinutesPerWeek: 5 * MIN_IN_HOUR,
      months: [],
      weeks: [],
    },
    {
      ...defaultProjectParams,
      id: PreviewUserProject.ProgrammingStudy,
      name: 'Study code',
      color: 9,
      emoji: '🦄',
      allocatedMinutesPerWeek: 2 * MIN_IN_HOUR,
      months: [],
      weeks: [],
    },
    {
      ...defaultProjectParams,
      id: PreviewUserProject.Content,
      name: 'Content Creation',
      color: 3,
      emoji: '🎥',
      allocatedMinutesPerWeek: 2 * MIN_IN_HOUR,
      months: [],
      weeks: [],
    },
    {
      ...defaultProjectParams,
      id: PreviewUserProject.Planning,
      name: 'Planning',
      color: 5,
      emoji: '📅',
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
      primaryGoal: 'awareness',
      sets: getSets(),
      projects,
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

type SetBoundaryDescriptor = [number, number]

type SetDescriptor = {
  start: SetBoundaryDescriptor
  end: SetBoundaryDescriptor
  projectId: PreviewUserProject
}

export const MOCK_SETS: SetDescriptor[][] = [
  [
    {
      start: [6, 7],
      end: [7, 26],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [9, 29],
      end: [9, 38],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [9, 48],
      end: [10, 23],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [10, 29],
      end: [10, 50],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [10, 55],
      end: [11, 7],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [11, 14],
      end: [11, 32],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [11, 36],
      end: [11, 52],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [11, 56],
      end: [12, 4],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [12, 49],
      end: [13, 6],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [13, 11],
      end: [13, 49],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [14, 20],
      end: [15, 15],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [17, 12],
      end: [17, 30],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [17, 35],
      end: [18, 10],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
  ],
  [
    {
      start: [6, 17],
      end: [6, 45],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [6, 52],
      end: [7, 27],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [7, 32],
      end: [7, 47],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [10, 0],
      end: [10, 21],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [10, 30],
      end: [10, 42],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [10, 48],
      end: [11, 3],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [11, 8],
      end: [11, 37],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [11, 43],
      end: [11, 53],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [11, 58],
      end: [12, 10],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [12, 10],
      end: [12, 35],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [12, 35],
      end: [12, 55],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [13, 38],
      end: [14, 9],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [14, 11],
      end: [14, 22],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [16, 7],
      end: [16, 27],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [16, 27],
      end: [16, 51],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [16, 51],
      end: [16, 57],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [17, 5],
      end: [17, 24],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [17, 28],
      end: [17, 43],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
  ],
  [
    {
      start: [6, 22],
      end: [7, 44],
      projectId: PreviewUserProject.Business,
    },

    {
      start: [10, 28],
      end: [11, 2],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [11, 8],
      end: [11, 45],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [11, 48],
      end: [12, 6],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [12, 11],
      end: [12, 32],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [13, 24],
      end: [13, 54],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [14, 2],
      end: [14, 23],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [14, 26],
      end: [14, 47],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [14, 50],
      end: [15, 30],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [16, 27],
      end: [16, 45],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [16, 45],
      end: [16, 57],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [16, 59],
      end: [17, 13],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [17, 21],
      end: [17, 38],
      projectId: PreviewUserProject.Business,
    },
    {
      start: [17, 42],
      end: [17, 54],
      projectId: PreviewUserProject.Business,
    },
  ],
  [
    {
      start: [6, 45],
      end: [7, 4],
      projectId: PreviewUserProject.Business,
    },
    {
      start: [7, 4],
      end: [7, 9],
      projectId: PreviewUserProject.Business,
    },
    {
      start: [7, 12],
      end: [7, 35],
      projectId: PreviewUserProject.Business,
    },
    {
      start: [7, 40],
      end: [7, 55],
      projectId: PreviewUserProject.Business,
    },
    {
      start: [7, 59],
      end: [8, 9],
      projectId: PreviewUserProject.Business,
    },
    {
      start: [10, 42],
      end: [11, 6],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [11, 10],
      end: [11, 28],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [11, 29],
      end: [11, 42],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [11, 46],
      end: [11, 55],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [12, 4],
      end: [12, 33],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [12, 36],
      end: [12, 46],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [12, 46],
      end: [12, 56],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [13, 27],
      end: [14, 15],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [14, 25],
      end: [15, 18],
      projectId: PreviewUserProject.Job,
    },
  ],
  [
    {
      start: [6, 14],
      end: [6, 59],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [7, 10],
      end: [7, 29],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [7, 31],
      end: [7, 42],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [11, 3],
      end: [11, 29],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [11, 31],
      end: [12, 15],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [12, 22],
      end: [12, 32],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [12, 34],
      end: [12, 45],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [12, 45],
      end: [12, 51],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [12, 59],
      end: [13, 11],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [13, 20],
      end: [13, 38],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [14, 14],
      end: [14, 40],
      projectId: PreviewUserProject.Job,
    },
    {
      start: [16, 13],
      end: [16, 59],
      projectId: PreviewUserProject.Business,
    },
    {
      start: [17, 5],
      end: [17, 12],
      projectId: PreviewUserProject.Content,
    },
    {
      start: [17, 16],
      end: [17, 25],
      projectId: PreviewUserProject.Content,
    },
    {
      start: [17, 26],
      end: [17, 33],
      projectId: PreviewUserProject.Content,
    },
  ],
  [
    {
      start: [10, 31],
      end: [11, 5],
      projectId: PreviewUserProject.ProgrammingStudy,
    },

    {
      start: [11, 10],
      end: [11, 30],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [11, 40],
      end: [12, 30],
      projectId: PreviewUserProject.ProgrammingStudy,
    },
    {
      start: [14, 20],
      end: [15, 6],
      projectId: PreviewUserProject.Content,
    },
    {
      start: [15, 14],
      end: [15, 46],
      projectId: PreviewUserProject.Content,
    },
  ],
  [
    {
      start: [10, 29],
      end: [11, 23],
      projectId: PreviewUserProject.Business,
    },
    {
      start: [11, 29],
      end: [11, 50],
      projectId: PreviewUserProject.Business,
    },
    {
      start: [14, 55],
      end: [15, 32],
      projectId: PreviewUserProject.Planning,
    },
    {
      start: [15, 36],
      end: [16, 4],
      projectId: PreviewUserProject.Planning,
    },
  ],
]

const getSets = () => {
  const today = new Date()
  const weekday = getWeekday(today)
  const now = Date.now()

  const thisWeek = MOCK_SETS.slice(0, weekday).reverse()
  const previousWeek = MOCK_SETS.slice(weekday).reverse()

  return [...thisWeek, ...previousWeek]
    .map((sets, daysAgo) => {
      const date = subDays(today, daysAgo)

      const getTimestamp = ([hour, minute]: SetBoundaryDescriptor) =>
        set(date, { hours: hour, minutes: minute }).getTime()

      return sets.map((set) => ({
        ...set,
        start: getTimestamp(set.start),
        end: getTimestamp(set.end),
      }))
    })
    .flat()
    .filter((set) => set.end < now)
}
