import { Project, ProjectResponse } from 'projects/Project'
import { Set } from 'sets/Set'
import { getSetsTotalInSeconds } from 'sets/utils/getSetsTotalInSeconds'
import { DefaultTheme } from 'styled-components'
import { S_IN_MIN } from 'utils/time'

export const toProject = (
  project: ProjectResponse,
  sets: Set[],
  theme: DefaultTheme,
): Project => {
  const projectSets = sets.filter((set) => set.projectId === project.id)

  const seconds = getSetsTotalInSeconds(projectSets)

  const projectDetails: Project = {
    ...project,
    total: project.total + seconds,
    doneMinutesThisWeek: Math.round(seconds / S_IN_MIN),
    hslaColor: theme.colors.getLabelColor(project.color),
  }

  return projectDetails
}
