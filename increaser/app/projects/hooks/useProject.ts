import { useProjects } from './useProjects'

export const useProject = (id: string | null) => {
  const { projectsRecord } = useProjects()

  return id ? projectsRecord[id] || null : null
}
