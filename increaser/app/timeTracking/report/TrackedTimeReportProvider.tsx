import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
} from 'react'
import { TimeFrame, TimeGrouping, timeFrames } from './TimeGrouping'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import {
  differenceInMonths,
  startOfDay,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { range } from '@lib/utils/array/range'
import { sum } from '@lib/utils/array/sum'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { match } from '@lib/utils/match'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { order } from '@lib/utils/array/order'
import { fromWeek, toWeek } from '@lib/utils/time/toWeek'
import { areSameWeek } from '@lib/utils/time/areSameWeek'
import { fromMonth, toMonth } from '@lib/utils/time/toMonth'
import { areSameMonth } from '@lib/utils/time/areSameMonth'
import { useCurrentWeekSets } from '@increaser/ui/sets/hooks/useCurrentWeekSets'
import { useCurrentMonthSets } from '../../sets/hooks/useCurrentMonthSets'
import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'

type ProjectsData = Record<string, number[]>

type TrackedTimeReportState = {
  activeProjectId: string | null
  timeGrouping: TimeGrouping
  includeCurrentPeriod: boolean
  timeFrame: TimeFrame
}

const defaultTimeGrouping = 'week'

type TrackedTimeReportProviderState = TrackedTimeReportState & {
  projectsData: ProjectsData
  firstTimeGroupStartedAt: number
  lastTimeGroupStartedAt: number
  setState: Dispatch<SetStateAction<TrackedTimeReportState>>
}

const TrackedTimeReportContext = createContext<
  TrackedTimeReportProviderState | undefined
>(undefined)

export const useTrackedTimeReport = createContextHook(
  TrackedTimeReportContext,
  'useTrackedTimeReport',
)

export const TrackedTimeReportProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [state, setState] = usePersistentState<TrackedTimeReportState>(
    PersistentStateKey.TrackedTimeReportPreferences,
    {
      activeProjectId: null,
      timeGrouping: defaultTimeGrouping,
      includeCurrentPeriod: false,
      timeFrame: timeFrames[defaultTimeGrouping][0],
    },
  )

  const { projects } = useProjects()
  const { sets } = useAssertUserState()

  const { includeCurrentPeriod, timeFrame, timeGrouping } = state

  const currentPeriodStartedAt = useMemo(
    () =>
      match(timeGrouping, {
        day: () => startOfDay(Date.now()).getTime(),
        week: () => getWeekStartedAt(Date.now()),
        month: () => startOfMonth(Date.now()).getTime(),
      }),
    [timeGrouping],
  )

  const previousPeriodStartedAt = useMemo(
    () =>
      match(timeGrouping, {
        day: () => currentPeriodStartedAt - convertDuration(1, 'd', 'ms'),
        week: () => currentPeriodStartedAt - convertDuration(1, 'w', 'ms'),
        month: () => subMonths(currentPeriodStartedAt, 1).getTime(),
      }),
    [timeGrouping, currentPeriodStartedAt],
  )

  const firstTimeGroupStartedAt = useMemo(
    () =>
      match(timeGrouping, {
        day: () => startOfDay(sets[0].start).getTime(),
        week: () => {
          const allWeeks = projects
            .flatMap((project) => project.weeks)
            .map(fromWeek)
          return isEmpty(allWeeks)
            ? currentPeriodStartedAt
            : order(allWeeks, (v) => v, 'asc')[0]
        },
        month: () => {
          const allMonths = projects
            .flatMap((project) => project.months)
            .map(fromMonth)
          return isEmpty(allMonths)
            ? currentPeriodStartedAt
            : order(allMonths, (v) => v, 'asc')[0]
        },
      }),
    [currentPeriodStartedAt, projects, sets, timeGrouping],
  )

  const lastTimeGroupStartedAt = includeCurrentPeriod
    ? currentPeriodStartedAt
    : previousPeriodStartedAt

  const currentWeekSets = useCurrentWeekSets()
  const currentMonthSets = useCurrentMonthSets()

  const projectsData = useMemo(() => {
    const totalDataPointsAvailable =
      match(timeGrouping, {
        day: () => {
          return Math.round(
            convertDuration(
              lastTimeGroupStartedAt - firstTimeGroupStartedAt,
              'ms',
              'd',
            ),
          )
        },
        week: () => {
          return Math.round(
            convertDuration(
              lastTimeGroupStartedAt - firstTimeGroupStartedAt,
              'ms',
              'w',
            ),
          )
        },
        month: () => {
          return differenceInMonths(
            lastTimeGroupStartedAt,
            firstTimeGroupStartedAt,
          )
        },
      }) + 1

    const dataPointsCount =
      timeFrame === null
        ? totalDataPointsAvailable
        : Math.min(totalDataPointsAvailable, timeFrame)

    const result: ProjectsData = {}
    projects.forEach((project) => {
      result[project.id] = range(dataPointsCount)
        .map((index) =>
          match(timeGrouping, {
            day: () => {
              const dayStartedAt =
                lastTimeGroupStartedAt - convertDuration(index, 'd', 'ms')
              return convertDuration(
                sum(
                  sets
                    .filter((set) => set.projectId === project.id)
                    .filter(
                      (set) => startOfDay(set.start).getTime() === dayStartedAt,
                    )
                    .map(getSetDuration),
                ),
                'ms',
                's',
              )
            },
            week: () => {
              const weekStartedAt =
                lastTimeGroupStartedAt - convertDuration(index, 'w', 'ms')

              if (weekStartedAt === currentPeriodStartedAt) {
                return convertDuration(
                  sum(
                    currentWeekSets
                      .filter((set) => set.projectId === project.id)
                      .map(getSetDuration),
                  ),
                  'ms',
                  's',
                )
              }
              const week = project.weeks.find((week) =>
                areSameWeek(week, toWeek(weekStartedAt)),
              )
              return week?.seconds ?? 0
            },
            month: () => {
              const monthStartedAt = subMonths(
                lastTimeGroupStartedAt,
                index,
              ).getTime()

              if (monthStartedAt === currentPeriodStartedAt) {
                return convertDuration(
                  sum(
                    currentMonthSets
                      .filter((set) => set.projectId === project.id)
                      .map(getSetDuration),
                  ),
                  'ms',
                  's',
                )
              }

              const month = project.months.find((month) =>
                areSameMonth(month, toMonth(monthStartedAt)),
              )
              return month?.seconds ?? 0
            },
          }),
        )
        .reverse()
    })

    return result
  }, [
    currentMonthSets,
    currentPeriodStartedAt,
    currentWeekSets,
    firstTimeGroupStartedAt,
    lastTimeGroupStartedAt,
    projects,
    sets,
    timeFrame,
    timeGrouping,
  ])

  useEffect(() => {
    if (!timeFrames[timeGrouping].includes(timeFrame)) {
      setState((state) => ({
        ...state,
        timeFrame: timeFrames[timeGrouping][0],
      }))
    }
  }, [setState, timeFrame, timeGrouping])

  return (
    <TrackedTimeReportContext.Provider
      value={{
        ...state,
        setState,
        projectsData,
        firstTimeGroupStartedAt,
        lastTimeGroupStartedAt,
      }}
    >
      {children}
    </TrackedTimeReportContext.Provider>
  )
}
