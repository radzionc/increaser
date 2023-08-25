import { Project } from 'projects/Project'

export const getProjectEmoji = (
  projectsRecord: Record<string, Project>,
  projectId = '',
) => {
  const project = projectsRecord[projectId]

  if (!project) return '❔'

  return project.emoji
}
