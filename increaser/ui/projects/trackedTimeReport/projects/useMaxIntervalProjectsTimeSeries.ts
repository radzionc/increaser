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
import { TimeGrouping } from '../timeGrouping/TimeGrouping'
import { subtractPeriod } from '../utils/subtractPeriod'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'
import { useTrackedProjects } from './TrackedProjectsProvider'
import { useStartOfCurrentTimeGroup } from '../timeGrouping/useStartOfCurrentTimeGroup'
import { useTrackedTimeIntervalLength } from '../interval/useTrackedTimeIntervalLength'

export const useMaxIntervalProjectsTimeSeries = () => {
  const projects = useTrackedProjects()

  const dataSize = useTrackedTimeIntervalLength()

  const [timeGrouping] = useTimeGrouping()

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
