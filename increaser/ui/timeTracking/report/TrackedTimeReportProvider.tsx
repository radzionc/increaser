import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useEffect, useMemo } from 'react'
import {
  TimeGrouping,
  timeFrames,
} from '@increaser/ui/timeTracking/report/TimeGrouping'
import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns'
import { range } from '@lib/utils/array/range'
import { match } from '@lib/utils/match'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { order } from '@lib/utils/array/order'
import { fromWeek, toWeek } from '@lib/utils/time/Week'
import { areSameWeek } from '@lib/utils/time/Week'
import { fromMonth, toMonth } from '@lib/utils/time/Month'
import { areSameMonth } from '@lib/utils/time/Month'
import { useTrackedTime } from '@increaser/ui/timeTracking/report/state/TrackedTimeContext'
import { areSameDay, fromDay, toDay } from '@lib/utils/time/Day'
import { EntityWithSeconds } from '@increaser/entities/timeTracking'
import { TrackedTimeReportContext } from '@increaser/ui/timeTracking/report/state/TrackedTimeReportContext'
import { useCurrentPeriodStartedAt } from '@increaser/ui/timeTracking/report/hooks/useCurrentPeriodStartedAt'
import { subtractPeriod } from '@increaser/ui/timeTracking/report/utils/subtractPeriod'
import { recordMap } from '@lib/utils/record/recordMap'
import { useTrackedTimeReportPreferences } from './state/useTrackedTimeReportPreferences'
import { isMoreThanZero } from '@lib/utils/isMoreThanZero'
import { fromYear } from '@lib/utils/time/Year'

export const TrackedTimeReportProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [state, setState] = useTrackedTimeReportPreferences()
  const { projects } = useTrackedTime()

  const { includeCurrentPeriod, timeFrame, timeGrouping } = state

  const currentPeriodStartedAt = useCurrentPeriodStartedAt(timeGrouping)

  const previousPeriodStartedAt = useMemo(
    () =>
      subtractPeriod({
        value: currentPeriodStartedAt,
        period: timeGrouping,
        amount: 1,
      }),
    [timeGrouping, currentPeriodStartedAt],
  )

  const lastTimeGroupStartedAt = includeCurrentPeriod
    ? currentPeriodStartedAt
    : previousPeriodStartedAt

  const firstTimeGroupStartedAt = useMemo(() => {
    const items = Object.values(projects).flatMap((project) =>
      match(timeGrouping, {
        day: () => project.days.map(fromDay),
        week: () => project.weeks.map(fromWeek),
        month: () => project.months.map(fromMonth),
        year: () => project.years.map(fromYear),
      }),
    )

    return isEmpty(items)
      ? currentPeriodStartedAt
      : order(items, (v) => v, 'asc')[0]
  }, [currentPeriodStartedAt, projects, timeGrouping])

  const dataPointsCount = useMemo(() => {
    const totalDataPointsAvailable =
      match(timeGrouping, {
        day: () =>
          differenceInDays(lastTimeGroupStartedAt, firstTimeGroupStartedAt),
        week: () =>
          differenceInWeeks(lastTimeGroupStartedAt, firstTimeGroupStartedAt),
        month: () =>
          differenceInMonths(lastTimeGroupStartedAt, firstTimeGroupStartedAt),
        year: () =>
          differenceInYears(lastTimeGroupStartedAt, firstTimeGroupStartedAt),
      }) + 1
    return timeFrame === null
      ? totalDataPointsAvailable
      : Math.min(totalDataPointsAvailable, timeFrame)
  }, [firstTimeGroupStartedAt, lastTimeGroupStartedAt, timeFrame, timeGrouping])

  const projectsTimeSeries = useMemo(() => {
    return recordMap(projects, ({ days, weeks, months, years }) =>
      range(dataPointsCount)
        .map((index) => {
          const startedAt = subtractPeriod({
            value: lastTimeGroupStartedAt,
            period: timeGrouping,
            amount: index,
          })

          return (
            match<TimeGrouping, EntityWithSeconds | undefined>(timeGrouping, {
              day: () => days.find((day) => areSameDay(day, toDay(startedAt))),
              week: () =>
                weeks.find((week) => areSameWeek(week, toWeek(startedAt))),
              month: () =>
                months.find((month) => areSameMonth(month, toMonth(startedAt))),
              year: () =>
                years.find(
                  ({ year }) => year === new Date(startedAt).getFullYear(),
                ),
            })?.seconds || 0
          )
        })
        .reverse(),
    )
  }, [dataPointsCount, lastTimeGroupStartedAt, projects, timeGrouping])

  useEffect(() => {
    if (!timeFrames[timeGrouping].includes(timeFrame)) {
      setState((state) => ({
        ...state,
        timeFrame: timeFrames[timeGrouping][0],
      }))
    }
  }, [setState, timeFrame, timeGrouping])

  useEffect(() => {
    if (
      state.activeProjectId &&
      !projectsTimeSeries[state.activeProjectId].some(isMoreThanZero)
    ) {
      setState((state) => ({ ...state, activeProjectId: null }))
    }
  }, [projectsTimeSeries, setState, state.activeProjectId])

  return (
    <TrackedTimeReportContext.Provider
      value={{
        ...state,
        setState,
        projectsTimeSeries,
        lastTimeGroupStartedAt,
        dataPointsCount,
      }}
    >
      {children}
    </TrackedTimeReportContext.Provider>
  )
}
