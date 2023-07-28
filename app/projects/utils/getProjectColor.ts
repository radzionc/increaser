import { Project } from 'projects/Project'
import { DefaultTheme } from 'styled-components'

export const getProjectColor = (
  projectsRecord: Record<string, Project>,
  theme: DefaultTheme,
  projectId = '',
) => {
  const project = projectsRecord[projectId]

  if (!project) return theme.colors.mist

  return theme.colors.getLabelColor(project.color)
}
