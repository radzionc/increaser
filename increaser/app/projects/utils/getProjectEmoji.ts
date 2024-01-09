import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'

export const getProjectEmoji = (
  projectsRecord: Record<string, EnhancedProject>,
  projectId = '',
) => {
  const project = projectsRecord[projectId]

  if (!project) return '❔'

  return project.emoji
}
