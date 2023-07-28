import { Project } from 'projects/Project'
import { useMemo } from 'react'
import { useProjects } from './useProjects'

export const useProjectsRecord = () => {
  const { projects } = useProjects()

  return useMemo(() => {
    const dict: Record<string, Project> = {}

    projects.forEach((project) => {
      dict[project.id] = project
    })

    return dict
  }, [projects])
}
