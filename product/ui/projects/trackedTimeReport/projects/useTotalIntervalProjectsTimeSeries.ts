import { range } from '@lib/utils/array/range'
import { match } from '@lib/utils/match'
import { recordMap } from '@lib/utils/record/recordMap'
import { areSameDay, toDay } from '@lib/utils/time/Day'
import { toMonth } from '@lib/utils/time/Month'
import { areSameMonth } from '@lib/utils/time/Month'
import { toWeek } from '@lib/utils/time/Week'
import { areSameWeek } from '@lib/utils/time/Week'
import { EntityWithSeconds } from '@product/entities/timeTracking'
import { useMemo } from 'react'

import { useTotalIntervalLength } from '../interval/useTotalIntervalLength'
import { useTimeGrouping } from '../timeGrouping/state'
import { TimeGrouping } from '../timeGrouping/TimeGrouping'
import { useStartOfCurrentTimeGroup } from '../timeGrouping/useStartOfCurrentTimeGroup'
import { subtractPeriod } from '../utils/subtractPeriod'

import { useTrackedProjects } from './TrackedProjectsProvider'

export const useTotalIntervalProjectsTimeSeries = () => {
  const projects = useTrackedProjects()

  const dataSize = useTotalIntervalLength()

  const timeGrouping = useTimeGrouping()

  const currentTimeGroupStartedAt = useStartOfCurrentTimeGroup()

  return useMemo(() => {
    return recordMap(projects, ({ days, weeks, months, years }) =>
      range(dataSize)
        .map((index) => {
          const startedAt = subtractPeriod({
            value: currentTimeGroupStartedAt,
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
  }, [dataSize, currentTimeGroupStartedAt, projects, timeGrouping])
}
