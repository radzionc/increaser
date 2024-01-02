import { useRouter } from 'next/router'
import { useProjects } from '@increaser/app/projects/hooks/useProjects'
import { createContext } from 'react'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { EnhancedProject } from '@increaser/app/projects/Project'

export interface ProjectsExplorerState {
  currentProject: EnhancedProject | null
}

type ProjectsPathParams = {
  id?: string
}

export const ProjectsExplorerContext = createContext<
  ProjectsExplorerState | undefined
>(undefined)

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
