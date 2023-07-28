import { Project } from 'projects/Project'

export const getProjectName = (
  projectsRecord: Record<string, Project>,
  projectId = '',
) => {
  const project = projectsRecord[projectId]

  return project?.name ?? 'Unknown'
}
