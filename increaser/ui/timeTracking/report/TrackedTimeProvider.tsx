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
import { toMonth } from '@lib/utils/time/Month'
import { areSameMonth } from '@lib/utils/time/Month'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useTrackedTimePreference } from '@increaser/ui/timeTracking/report/state/useTrackedTimePreference'
import {
  TimeTrackingProjectData,
  TrackedTimeContext,
} from '@increaser/ui/timeTracking/report/state/TrackedTimeContext'
import { hideProjectNames } from '@increaser/ui/timeTracking/report/utils/hideProjectNames'
import { mergeTrackedDataPoint } from '@increaser/ui/timeTracking/report/utils/mergeTrackedDataPoint'
import { trackedTimeToProjectWeeks } from '@increaser/entities-utils/project/trackedTimeToProjectWeeks'
import { trackedTimeToProjectMonths } from '@increaser/entities-utils/project/trackedTimeToProjectMonths'

export const TrackedTimeProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { projects: allProjects } = useProjects()
  const { sets, weeks, months } = useAssertUserState()

  const weekStartedAt = useStartOfWeek()
  const monthStartedAt = useStartOfMonth()

  const [state, setState] = useTrackedTimePreference()
  const { shouldHideProjectNames } = state

  const projects = useMemo(() => {
    const result: Record<string, TimeTrackingProjectData> = {}

    const weeksRecord = trackedTimeToProjectWeeks({ trackedTime: weeks })
    const monthsRecord = trackedTimeToProjectMonths({ trackedTime: months })

    allProjects.forEach((project) => {
      result[project.id] = {
        ...pick(project, ['id', 'hslaColor', 'name']),
        days: [],
        weeks: weeksRecord[project.id] ?? [],
        months: monthsRecord[project.id] ?? [],
      }
    })

    sets.forEach((set) => {
      const project = result[set.projectId]

      if (!project) return

      const seconds = convertDuration(getSetDuration(set), 'ms', 's')

      const day = toDay(set.start)

      project.days = mergeTrackedDataPoint({
        groups: project.days,
        dataPoint: {
          ...day,
          seconds,
        },
        areSameGroup: areSameDay,
      })

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
      }
    })

    return shouldHideProjectNames ? hideProjectNames(result) : result
  }, [
    allProjects,
    monthStartedAt,
    months,
    sets,
    shouldHideProjectNames,
    weekStartedAt,
    weeks,
  ])

  return (
    <TrackedTimeContext.Provider value={{ projects, setState, ...state }}>
      {children}
    </TrackedTimeContext.Provider>
  )
}
