import { useMemo } from 'react'
import { TimeGrouping } from '@increaser/ui/timeTracking/report/TimeGrouping'

import { range } from '@lib/utils/array/range'
import { match } from '@lib/utils/match'
import { toWeek } from '@lib/utils/time/Week'
import { areSameWeek } from '@lib/utils/time/Week'
import { toMonth } from '@lib/utils/time/Month'
import { areSameMonth } from '@lib/utils/time/Month'
import { useTrackedTime } from '@increaser/ui/timeTracking/report/state/TrackedTimeContext'
import { areSameDay, toDay } from '@lib/utils/time/Day'
import { EntityWithSeconds } from '@increaser/entities/timeTracking'
import { subtractPeriod } from '@increaser/ui/timeTracking/report/utils/subtractPeriod'
import { recordMap } from '@lib/utils/record/recordMap'
import { useLastDataPointStartedAt } from './useLastDataPointStartedAt'
import { useTrackedTimeReportPreferences } from '../state/useTrackedTimeReportPreferences'
import { useCurrentDataSize } from './useCurrentDataSize'

export const useProjectsTimeSeries = () => {
  const [state] = useTrackedTimeReportPreferences()
  const { projects } = useTrackedTime()

  const dataSize = useCurrentDataSize()

  const { timeGrouping } = state

  const lastDataPointStartedAt = useLastDataPointStartedAt()

  return useMemo(() => {
    return recordMap(projects, ({ days, weeks, months, years }) =>
      range(dataSize)
        .map((index) => {
          const startedAt = subtractPeriod({
            value: lastDataPointStartedAt,
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
  }, [dataSize, lastDataPointStartedAt, projects, timeGrouping])
}
