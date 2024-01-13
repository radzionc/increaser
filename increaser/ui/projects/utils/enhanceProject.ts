import { DefaultTheme } from 'styled-components'
import { Project } from '@increaser/entities/Project'
import { EnhancedProject } from '../EnhancedProject'
import { Set } from '@increaser/entities/User'
import { sum } from '@lib/utils/array/sum'
import { startOfMonth, startOfWeek } from 'date-fns'
import { getSetsStartedAfter } from '@increaser/entities-utils/set/getSetsStartedAfter'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const enhanceProject = (
  project: Project,
  sets: Set[],
  theme: DefaultTheme,
): EnhancedProject => {
  const projectSets = sets.filter((set) => set.projectId === project.id)

  const monthStartedAt = startOfMonth(new Date()).getTime()
  const currentMonthSets = getSetsStartedAfter(projectSets, monthStartedAt)

  const weekStartedAt = startOfWeek(new Date()).getTime()
  const currentWeekSets = getSetsStartedAfter(projectSets, weekStartedAt)

  const projectDetails: EnhancedProject = {
    ...project,
    total:
      sum(project.months.map((month) => month.seconds)) +
      Math.round(convertDuration(getSetsDuration(currentMonthSets), 'ms', 's')),
    doneMinutesThisWeek: Math.round(
      convertDuration(getSetsDuration(currentWeekSets), 'ms', 'min'),
    ),
    hslaColor: theme.colors.getLabelColor(project.color),
  }

  return projectDetails
}
