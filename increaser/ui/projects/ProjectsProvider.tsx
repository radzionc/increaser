import { createContext, useMemo } from 'react'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { getRecord } from '@lib/utils/record/getRecord'
import { useTheme } from 'styled-components'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { EnhancedProject } from './EnhancedProject'
import { enhanceProject } from './utils/enhanceProject'

interface ProjectsState {
  projects: EnhancedProject[]
  activeProjects: EnhancedProject[]
  allocatedProjects: EnhancedProject[]
  projectsRecord: Record<string, EnhancedProject>
}

const getProjectSortingNumber = ({
  allocatedMinutesPerWeek,
  doneMinutesThisWeek,
  status,
}: EnhancedProject) => {
  if (status !== 'active') return 100000000000
  if (!allocatedMinutesPerWeek && !doneMinutesThisWeek) return 1000000000
  if (!allocatedMinutesPerWeek) return doneMinutesThisWeek

  return doneMinutesThisWeek / allocatedMinutesPerWeek
}

export const ProjectsContext = createContext<ProjectsState | undefined>(
  undefined,
)

export const ProjectsProvider = ({ children }: ComponentWithChildrenProps) => {
  const state = useAssertUserState()

  const theme = useTheme()

  const projects = useMemo(
    () =>
      state.projects
        .map((project) => enhanceProject(project, state.sets, theme))
        .sort(
          (one, another) =>
            getProjectSortingNumber(one) - getProjectSortingNumber(another),
        ),
    [state.projects, state.sets, theme],
  )

  const activeProjects = useMemo(
    () => projects.filter(({ status }) => status === 'active'),
    [projects],
  )

  const allocatedProjects = useMemo(
    () =>
      projects.filter(
        ({ allocatedMinutesPerWeek }) => allocatedMinutesPerWeek > 0,
      ),
    [projects],
  )

  const projectsRecord = useMemo(
    () => getRecord(projects, (project) => project.id),
    [projects],
  )

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        activeProjects,
        allocatedProjects,
        projectsRecord,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export const useProjects = createContextHook(ProjectsContext, 'ProjectsContext')
