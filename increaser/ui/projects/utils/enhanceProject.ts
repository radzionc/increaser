import { DefaultTheme } from 'styled-components'
import { Project } from '@increaser/entities/Project'
import { EnhancedProject } from '../EnhancedProject'
import { Set } from '@increaser/entities/User'
import { sum } from '@lib/utils/array/sum'
import { startOfMonth } from 'date-fns'
import { getSetsStartedAfter } from '@increaser/entities-utils/set/getSetsStartedAfter'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'

export const enhanceProject = (
  project: Project,
  sets: Set[],
  theme: DefaultTheme,
): EnhancedProject => {
  const projectSets = sets.filter((set) => set.projectId === project.id)

  const monthStartedAt = startOfMonth(new Date()).getTime()
  const currentMonthSets = getSetsStartedAfter(projectSets, monthStartedAt)
  console.log(project.name, monthStartedAt)

  const weekStartedAt = getWeekStartedAt(Date.now())
  const currentWeekSets = getSetsStartedAfter(projectSets, weekStartedAt)

  const total =
    sum(project.months.map((month) => month.seconds)) +
    Math.round(convertDuration(getSetsDuration(currentMonthSets), 'ms', 's'))

  const projectDetails: EnhancedProject = {
    ...project,
    total,
    doneMinutesThisWeek: Math.round(
      convertDuration(getSetsDuration(currentWeekSets), 'ms', 'min'),
    ),
    hslaColor: theme.colors.getLabelColor(project.color),
  }

  return projectDetails
}
