import { useMemo } from 'react'
import { useBudgetedProjects } from './useBudgetedProjects'

export const useProjectsWithGoals = () => {
  const projects = useBudgetedProjects()

  return useMemo(
    () => projects.filter((project) => project.goal !== null),
    [projects],
  )
}
