import { DefaultTheme } from 'styled-components'
import { Project } from '@increaser/entities/Project'
import { EnhancedProject } from '../EnhancedProject'
import { Set } from '@increaser/entities/User'
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

  const weekStartedAt = getWeekStartedAt(Date.now())
  const currentWeekSets = getSetsStartedAfter(projectSets, weekStartedAt)

  const projectDetails: EnhancedProject = {
    ...project,
    doneMinutesThisWeek: Math.round(
      convertDuration(getSetsDuration(currentWeekSets), 'ms', 'min'),
    ),
    hslaColor: theme.colors.getLabelColor(project.color),
  }

  return projectDetails
}
