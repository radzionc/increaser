import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'

export const getProjectName = (
  projectsRecord: Record<string, EnhancedProject>,
  projectId = '',
) => {
  const project = projectsRecord[projectId]

  return project?.name ?? 'Unknown'
}
