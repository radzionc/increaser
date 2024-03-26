import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { pick } from '@lib/utils/record/pick'
import { Dispatch, SetStateAction, createContext, useMemo } from 'react'
import { areSameDay, toDay } from '@lib/utils/time/Day'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { useStartOfMonth } from '@lib/ui/hooks/useStartOfMonth'
import { toWeek } from '@lib/utils/time/toWeek'
import { areSameWeek } from '@lib/utils/time/Week'
import { toMonth } from '@lib/utils/time/toMonth'
import { areSameMonth } from '@lib/utils/time/Month'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { order } from '@lib/utils/array/order'
import { sum } from '@lib/utils/array/sum'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import {
  TrackedTimePreference,
  useTrackedTimePreference,
} from './useTrackedTimePreference'
import { ProjectDay } from '@increaser/entities/timeTracking'

type TimeTrackingProjectData = Pick<
  EnhancedProject,
  'hslaColor' | 'name' | 'weeks' | 'months' | 'id' | 'emoji'
> & {
  days: ProjectDay[]
}

type TrackedTimeState = TrackedTimePreference & {
  setState: Dispatch<SetStateAction<TrackedTimePreference>>
  projects: Record<string, TimeTrackingProjectData>
}

const TrackedTimeContext = createContext<TrackedTimeState | undefined>(
  undefined,
)

export const useTrackedTime = createContextHook(
  TrackedTimeContext,
  'useTrackedTime',
)

export const TrackedTimeProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { projects: allProjects } = useProjects()
  const { sets } = useAssertUserState()

  const weekStartedAt = useStartOfWeek()
  const monthStartedAt = useStartOfMonth()

  const [state, setState] = useTrackedTimePreference()

  const projects = useMemo(() => {
    const result: Record<string, TimeTrackingProjectData> = {}

    allProjects.forEach((project) => {
      result[project.id] = {
        ...pick(project, [
          'id',
          'hslaColor',
          'name',
          'weeks',
          'months',
          'emoji',
        ]),
        days: [],
      }
    })

    sets.forEach((set) => {
      const project = result[set.projectId]

      if (!project) return

      const day = toDay(set.start)
      const seconds = convertDuration(getSetDuration(set), 'ms', 's')

      const existingDayIndex = project.days.findIndex((d) => areSameDay(d, day))
      if (existingDayIndex > -1) {
        project.days = updateAtIndex(
          project.days,
          existingDayIndex,
          (existingDay) => ({
            ...existingDay,
            seconds: existingDay.seconds + seconds,
          }),
        )
      } else {
        project.days.push({
          ...day,
          seconds,
        })
      }

      if (set.start > weekStartedAt) {
        const week = toWeek(set.start)
        const existingWeekIndex = project.weeks.findIndex((w) =>
          areSameWeek(w, week),
        )
        if (existingWeekIndex > -1) {
          project.weeks = updateAtIndex(
            project.weeks,
            existingWeekIndex,
            (existingWeek) => ({
              ...existingWeek,
              seconds: existingWeek.seconds + seconds,
            }),
          )
        } else {
          project.weeks.push({
            ...week,
            seconds,
          })
        }
      }

      if (set.start > monthStartedAt) {
        const month = toMonth(set.start)
        const existingMonthIndex = project.months.findIndex((m) =>
          areSameMonth(m, month),
        )
        if (existingMonthIndex > -1) {
          project.months = updateAtIndex(
            project.months,
            existingMonthIndex,
            (existingMonth) => ({
              ...existingMonth,
              seconds: existingMonth.seconds + seconds,
            }),
          )
        } else {
          project.months.push({
            ...month,
            seconds,
          })
        }
      }
    })

    if (!state.hideProjectNames) {
      return result
    }

    const orderedProjects = order(
      Object.values(result),
      (p) => sum(p.months.map((m) => m.seconds)),
      'desc',
    )

    Object.keys(result).forEach((id) => {
      const project = result[id]
      const projectIndex = orderedProjects.findIndex((p) => p.id === id)
      project.name = `Project #${projectIndex + 1}`
    })

    return result
  }, [allProjects, monthStartedAt, sets, state.hideProjectNames, weekStartedAt])

  return (
    <TrackedTimeContext.Provider value={{ projects, setState, ...state }}>
      {children}
    </TrackedTimeContext.Provider>
  )
}
