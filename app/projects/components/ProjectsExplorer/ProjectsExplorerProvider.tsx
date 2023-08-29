import { useRouter } from 'next/router'
import { useProjects } from 'projects/hooks/useProjects'
import { createContext } from 'react'
import { Path } from 'router/Path'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { createContextHook } from '@increaser/ui/state/createContextHook'
import { EnhancedProject } from 'projects/Project'

export interface ProjectsExplorerState {
  currentProject: EnhancedProject | null
}

type ProjectsPathParams = {
  id?: string
}

export const ProjectsExplorerContext = createContext<
  ProjectsExplorerState | undefined
>(undefined)

export const getPathToProject = (projectId: string) =>
  `${Path.Projects}/${projectId}`

export const ProjectsExplorerProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { projectsRecord } = useProjects()

  const router = useRouter()
  const projectId = (router.query as ProjectsPathParams).id || null

  return (
    <ProjectsExplorerContext.Provider
      value={{
        currentProject: projectId ? projectsRecord[projectId] : null,
      }}
    >
      {children}
    </ProjectsExplorerContext.Provider>
  )
}

export const useProjectExplorer = createContextHook(
  ProjectsExplorerContext,
  'ProjectsExplorerContext',
)
