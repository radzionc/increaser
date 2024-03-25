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
import {
  differenceInMonths,
  startOfDay,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { range } from '@lib/utils/array/range'
import { match } from '@lib/utils/match'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { order } from '@lib/utils/array/order'
import { fromWeek, toWeek } from '@lib/utils/time/toWeek'
import { areSameWeek } from '@lib/utils/time/Week'
import { fromMonth, toMonth } from '@lib/utils/time/toMonth'
import { areSameMonth } from '@lib/utils/time/areSameMonth'
import { useTrackedTimeReportPreferences } from './useTrackedTimeReportPreferences'
import { useTrackedTime } from './TrackedTimeProvider'
import { areSameDay, fromDay, toDay } from '@lib/utils/time/Day'
import { EntityWithSeconds } from '@increaser/entities/Project'

type ProjectsData = Record<string, number[]>

type TrackedTimeReportState = {
  activeProjectId: string | null
  timeGrouping: TimeGrouping
  includeCurrentPeriod: boolean
  timeFrame: TimeFrame
}

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
  const [state, setState] = useTrackedTimeReportPreferences()
  const { projects } = useTrackedTime()

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

  const firstTimeGroupStartedAt = useMemo(() => {
    const items = Object.values(projects).flatMap((project) =>
      match(timeGrouping, {
        day: () => project.days.map(fromDay),
        week: () => project.weeks.map(fromWeek),
        month: () => project.months.map(fromMonth),
      }),
    )

    return isEmpty(items)
      ? currentPeriodStartedAt
      : order(items, (v) => v, 'asc')[0]
  }, [currentPeriodStartedAt, projects, timeGrouping])

  const lastTimeGroupStartedAt = includeCurrentPeriod
    ? currentPeriodStartedAt
    : previousPeriodStartedAt

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
    Object.entries(projects).forEach(([id, { weeks, days, months }]) => {
      result[id] = range(dataPointsCount)
        .map((index) => {
          const startedAt = match(timeGrouping, {
            day: () =>
              lastTimeGroupStartedAt - convertDuration(index, 'd', 'ms'),
            week: () =>
              lastTimeGroupStartedAt - convertDuration(index, 'w', 'ms'),
            month: () => subMonths(lastTimeGroupStartedAt, index).getTime(),
          })

          return (
            match<TimeGrouping, EntityWithSeconds | undefined>(timeGrouping, {
              day: () => days.find((day) => areSameDay(day, toDay(startedAt))),
              week: () =>
                weeks.find((week) => areSameWeek(week, toWeek(startedAt))),
              month: () =>
                months.find((month) => areSameMonth(month, toMonth(startedAt))),
            })?.seconds || 0
          )
        })
        .reverse()
    })

    return result
  }, [
    firstTimeGroupStartedAt,
    lastTimeGroupStartedAt,
    projects,
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
