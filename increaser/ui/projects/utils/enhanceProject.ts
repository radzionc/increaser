import { DefaultTheme } from 'styled-components'
import { S_IN_MIN } from '@lib/utils/time'
import { getSetsDurationInSeconds } from '@increaser/entities-utils/set/getSetsDurationInSeconds'
import { Project } from '@increaser/entities/Project'
import { EnhancedProject } from '../EnhancedProject'
import { Set } from '@increaser/entities/User'

export const enhanceProject = (
  project: Project,
  sets: Set[],
  theme: DefaultTheme,
): EnhancedProject => {
  const projectSets = sets.filter((set) => set.projectId === project.id)

  const seconds = getSetsDurationInSeconds(projectSets)

  const projectDetails: EnhancedProject = {
    ...project,
    total: project.total + seconds,
    doneMinutesThisWeek: Math.round(seconds / S_IN_MIN),
    hslaColor: theme.colors.getLabelColor(project.color),
  }

  return projectDetails
}
