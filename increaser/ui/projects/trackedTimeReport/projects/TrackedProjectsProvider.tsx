import { setupMemoProvider } from '@lib/ui/state/setupMemoProvider'
import { useUser } from '@increaser/ui/user/state/user'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { useStartOfMonth } from '@lib/ui/hooks/useStartOfMonth'
import { useShouldHideProjectNames } from '../hideProjectNames/useShouldHideProjectNames'
import { trackedTimeToProjectMonths } from '@increaser/entities-utils/project/trackedTimeToProjectMonths'
import { trackedTimeToProjectWeeks } from '@increaser/entities-utils/project/trackedTimeToProjectWeeks'
import { trackedTimeToProjectYears } from '@increaser/entities-utils/project/trackedTimeToProjectYears'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { pick } from '@lib/utils/record/pick'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { toDay, areSameDay } from '@lib/utils/time/Day'
import { toMonth, areSameMonth, stringToMonth } from '@lib/utils/time/Month'
import { toWeek, areSameWeek } from '@lib/utils/time/Week'
import { areSameYear } from '@lib/utils/time/Year'
import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { hideProjectNames } from '../hideProjectNames/hideProjectNames'
import { mergeTrackedDataPoint } from '../utils/mergeTrackedDataPoint'
import { subDays, startOfDay } from 'date-fns'
import {
  ProjectWeek,
  ProjectMonth,
  ProjectYear,
  ProjectDay,
} from '@increaser/entities/timeTracking'
import { HSLA } from '@lib/ui/colors/HSLA'

const daysMax = 30

type TrackedProject = {
  color: HSLA
  name: string
  emoji: string
  id: string
  weeks: ProjectWeek[]
  months: ProjectMonth[]
  years: ProjectYear[]
  days: ProjectDay[]
}

export type TrackedProjects = Record<string, TrackedProject>

export const {
  provider: TrackedProjectsProvider,
  useValue: useTrackedProjects,
} = setupMemoProvider({
  name: 'TrackedProjects',
  useValue: () => {
    const { sets, weeks, months, years, projects: allProjects } = useUser()

    const weekStartedAt = useStartOfWeek()
    const monthStartedAt = useStartOfMonth()
    const currentYear = new Date().getFullYear()

    const [shouldHideProjectNames] = useShouldHideProjectNames()

    const {
      colors: { getLabelColor },
    } = useTheme()

    return useMemo(() => {
      const result: TrackedProjects = {}

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

      const firstDayStartedAt = startOfDay(
        subDays(Date.now(), daysMax),
      ).getTime()

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
  },
})
