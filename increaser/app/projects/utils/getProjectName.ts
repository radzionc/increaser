import { EnhancedProject } from '@increaser/app/projects/Project'

export const getProjectName = (
  projectsRecord: Record<string, EnhancedProject>,
  projectId = '',
) => {
  const project = projectsRecord[projectId]

  return project?.name ?? 'Unknown'
}
