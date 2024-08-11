import { useMemo } from 'react'
import { match } from '@lib/utils/match'
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
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'
import { useTrackedProjects } from '../projects/TrackedProjectsProvider'
import { useStartOfCurrentTimeGroup } from '../timeGrouping/useStartOfCurrentTimeGroup'
import { useStartOfLastTimeGroup } from '../timeGrouping/useStartOfLastTimeGroup'

export const useMaxDataSize = () => {
  const [timeGrouping] = useTimeGrouping()
  const projects = useTrackedProjects()
  const currentPeriodStartedAt = useStartOfCurrentTimeGroup()

  const lastTimeGroupStartedAt = useStartOfLastTimeGroup()

  const firstTimeGroupStartedAt = useMemo(() => {
    const items = Object.values(projects).flatMap((project) =>
      match(timeGrouping, {
        day: () => project.days.slice(0, 1).map(fromDay),
        week: () => project.weeks.slice(0, 1).map(fromWeek),
        month: () => project.months.slice(0, 1).map(fromMonth),
        year: () => project.years.slice(0, 1).map(fromYear),
      }),
    )

    return Math.min(currentPeriodStartedAt, ...items)
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
