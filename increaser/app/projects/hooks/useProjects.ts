import { ProjectsContext } from '@increaser/app/projects/components/ProjectsProvider'
import { createContextHook } from '@lib/ui/state/createContextHook'

export const useProjects = createContextHook(ProjectsContext, 'ProjectsContext')
