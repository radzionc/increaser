import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useEffect, useMemo } from 'react'
import { TimeGrouping, timeFrames } from './TimeGrouping'
import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
} from 'date-fns'
import { range } from '@lib/utils/array/range'
import { match } from '@lib/utils/match'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { order } from '@lib/utils/array/order'
import { fromWeek, toWeek } from '@lib/utils/time/Week'
import { areSameWeek } from '@lib/utils/time/Week'
import { fromMonth, toMonth } from '@lib/utils/time/Month'
import { areSameMonth } from '@lib/utils/time/Month'
import { useTrackedTimeReportPreferences } from './state/useTrackedTimeReportPreferences'
import { useTrackedTime } from './state/TrackedTimeContext'
import { areSameDay, fromDay, toDay } from '@lib/utils/time/Day'
import { EntityWithSeconds } from '@increaser/entities/timeTracking'
import { TrackedTimeReportContext } from './state/TrackedTimeReportContext'
import { useCurrentPeriodStartedAt } from './hooks/useCurrentPeriodStartedAt'
import { subtractPeriod } from './utils/subtractPeriod'
import { recordMap } from '@lib/utils/record/recordMap'

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
      }),
    )

    return isEmpty(items)
      ? currentPeriodStartedAt
      : order(items, (v) => v, 'asc')[0]
  }, [currentPeriodStartedAt, projects, timeGrouping])

  const projectsTimeSeries = useMemo(() => {
    const totalDataPointsAvailable =
      match(timeGrouping, {
        day: () =>
          differenceInDays(lastTimeGroupStartedAt, firstTimeGroupStartedAt),
        week: () =>
          differenceInWeeks(lastTimeGroupStartedAt, firstTimeGroupStartedAt),
        month: () =>
          differenceInMonths(lastTimeGroupStartedAt, firstTimeGroupStartedAt),
      }) + 1

    const dataPointsCount =
      timeFrame === null
        ? totalDataPointsAvailable
        : Math.min(totalDataPointsAvailable, timeFrame)

    return recordMap(projects, ({ days, weeks, months }) =>
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
            })?.seconds || 0
          )
        })
        .reverse(),
    )
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
        projectsTimeSeries,
        firstTimeGroupStartedAt,
        lastTimeGroupStartedAt,
      }}
    >
      {children}
    </TrackedTimeReportContext.Provider>
  )
}
