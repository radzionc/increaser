import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { pick } from '@lib/utils/record/pick'
import { useMemo } from 'react'
import { areSameDay, toDay } from '@lib/utils/time/Day'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { useStartOfMonth } from '@lib/ui/hooks/useStartOfMonth'
import { toWeek } from '@lib/utils/time/Week'
import { areSameWeek } from '@lib/utils/time/Week'
import { stringToMonth, toMonth } from '@lib/utils/time/Month'
import { areSameMonth } from '@lib/utils/time/Month'
import { useTrackedTimePreference } from '@increaser/ui/timeTracking/report/state/useTrackedTimePreference'
import {
  TimeTrackingProjectData,
  TrackedTimeContext,
} from '@increaser/ui/timeTracking/report/state/TrackedTimeContext'
import { hideProjectNames } from '@increaser/ui/timeTracking/report/utils/hideProjectNames'
import { mergeTrackedDataPoint } from '@increaser/ui/timeTracking/report/utils/mergeTrackedDataPoint'
import { trackedTimeToProjectWeeks } from '@increaser/entities-utils/project/trackedTimeToProjectWeeks'
import { trackedTimeToProjectMonths } from '@increaser/entities-utils/project/trackedTimeToProjectMonths'
import { useTheme } from 'styled-components'
import { trackedTimeToProjectYears } from '@increaser/entities-utils/project/trackedTimeToProjectYears'
import { areSameYear } from '@lib/utils/time/Year'
import { subDays, startOfDay } from 'date-fns'

const daysMax = 30

export const TrackedTimeProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const {
    sets,
    weeks,
    months,
    years,
    projects: allProjects,
  } = useAssertUserState()

  const weekStartedAt = useStartOfWeek()
  const monthStartedAt = useStartOfMonth()
  const currentYear = new Date().getFullYear()

  const [state, setState] = useTrackedTimePreference()
  const { shouldHideProjectNames } = state

  const {
    colors: { getLabelColor },
  } = useTheme()

  const projects = useMemo(() => {
    const result: Record<string, TimeTrackingProjectData> = {}

    const weeksRecord = trackedTimeToProjectWeeks({ trackedTime: weeks })
    const monthsRecord = trackedTimeToProjectMonths({ trackedTime: months })
    const yearsRecord = trackedTimeToProjectYears({ trackedTime: years })

    Object.values(allProjects).forEach((project) => {
      result[project.id] = {
        ...pick(project, ['id', 'name', 'emoji']),
        color: getLabelColor(project.color),
        days: [],
        weeks: weeksRecord[project.id] ?? [],
        months: monthsRecord[project.id] ?? [],
        years: yearsRecord[project.id] ?? [],
      }
    })

    const firstDayStartedAt = startOfDay(subDays(Date.now(), daysMax)).getTime()

    sets.forEach((set) => {
      const project = result[set.projectId]

      if (!project) return

      const seconds = convertDuration(getSetDuration(set), 'ms', 's')

      const day = toDay(set.start)

      if (set.start > firstDayStartedAt) {
        project.days = mergeTrackedDataPoint({
          groups: project.days,
          dataPoint: {
            ...day,
            seconds,
          },
          areSameGroup: areSameDay,
        })
      }

      if (set.start > weekStartedAt) {
        const week = toWeek(set.start)
        project.weeks = mergeTrackedDataPoint({
          groups: project.weeks,
          dataPoint: {
            ...week,
            seconds,
          },
          areSameGroup: areSameWeek,
        })
      }

      if (set.start > monthStartedAt) {
        const month = toMonth(set.start)
        project.months = mergeTrackedDataPoint({
          groups: project.months,
          dataPoint: {
            ...month,
            seconds,
          },
          areSameGroup: areSameMonth,
        })
        project.years = mergeTrackedDataPoint({
          groups: project.years,
          dataPoint: {
            year: month.year,
            seconds,
          },
          areSameGroup: areSameYear,
        })
      }
    })

    Object.entries(months).forEach(([monthKey, timeRecord]) => {
      const { year } = stringToMonth(monthKey)
      if (year === currentYear) {
        Object.entries(timeRecord).forEach(([projectId, seconds]) => {
          const project = result[projectId]

          if (!project) return

          project.years = mergeTrackedDataPoint({
            groups: project.years,
            dataPoint: {
              year,
              seconds,
            },
            areSameGroup: areSameYear,
          })
        })
      }
    })

    return shouldHideProjectNames ? hideProjectNames(result) : result
  }, [
    allProjects,
    currentYear,
    getLabelColor,
    monthStartedAt,
    months,
    sets,
    shouldHideProjectNames,
    weekStartedAt,
    weeks,
    years,
  ])

  return (
    <TrackedTimeContext.Provider value={{ projects, setState, ...state }}>
      {children}
    </TrackedTimeContext.Provider>
  )
}
