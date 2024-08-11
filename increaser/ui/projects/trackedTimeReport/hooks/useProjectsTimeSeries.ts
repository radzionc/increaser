import { useMemo } from 'react'

import { range } from '@lib/utils/array/range'
import { match } from '@lib/utils/match'
import { toWeek } from '@lib/utils/time/Week'
import { areSameWeek } from '@lib/utils/time/Week'
import { toMonth } from '@lib/utils/time/Month'
import { areSameMonth } from '@lib/utils/time/Month'
import { areSameDay, toDay } from '@lib/utils/time/Day'
import { EntityWithSeconds } from '@increaser/entities/timeTracking'
import { recordMap } from '@lib/utils/record/recordMap'
import { useCurrentDataSize } from './useCurrentDataSize'
import { TimeGrouping } from '../timeGrouping/TimeGrouping'
import { subtractPeriod } from '../utils/subtractPeriod'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'
import { useTrackedProjects } from '../projects/TrackedProjectsProvider'
import { useStartOfLastTimeGroup } from '../timeGrouping/useStartOfLastTimeGroup'

export const useProjectsTimeSeries = () => {
  const projects = useTrackedProjects()

  const dataSize = useCurrentDataSize()

  const [timeGrouping] = useTimeGrouping()

  const lastDataPointStartedAt = useStartOfLastTimeGroup()

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
