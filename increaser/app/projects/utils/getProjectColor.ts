import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { DefaultTheme } from 'styled-components'

export const getProjectColor = (
  projectsRecord: Record<string, EnhancedProject>,
  theme: DefaultTheme,
  projectId = '',
) => {
  const project = projectsRecord[projectId]

  if (!project) return theme.colors.mist

  return theme.colors.getLabelColor(project.color)
}
