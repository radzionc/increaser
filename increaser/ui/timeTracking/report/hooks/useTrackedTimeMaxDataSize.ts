import { useMemo } from 'react'
import { useTrackedTimeReportPreferences } from '../state/useTrackedTimeReportPreferences'
import { useCurrentPeriodStartedAt } from './useCurrentPeriodStartedAt'
import { subtractPeriod } from '../utils/subtractPeriod'
import { match } from '@lib/utils/match'
import { useTrackedTime } from '../state/TrackedTimeContext'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { order } from '@lib/utils/array/order'
import { fromDay } from '@lib/utils/time/Day'
import { fromMonth } from '@lib/utils/time/Month'
import { fromWeek } from '@lib/utils/time/Week'
import { fromYear } from '@lib/utils/time/Year'
import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns'

export const useTrackedTimeMaxDataSize = () => {
  const [{ timeGrouping, includeCurrentPeriod }] =
    useTrackedTimeReportPreferences()
  const { projects } = useTrackedTime()
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

  return (
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
  )
}
