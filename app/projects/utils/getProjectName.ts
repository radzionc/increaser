import { EnhancedProject } from 'projects/Project'

export const getProjectName = (
  projectsRecord: Record<string, EnhancedProject>,
  projectId = '',
) => {
  const project = projectsRecord[projectId]

  return project?.name ?? 'Unknown'
}
