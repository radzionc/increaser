import { EnhancedProject } from 'projects/Project'

export const getProjectEmoji = (
  projectsRecord: Record<string, EnhancedProject>,
  projectId = '',
) => {
  const project = projectsRecord[projectId]

  if (!project) return '❔'

  return project.emoji
}
