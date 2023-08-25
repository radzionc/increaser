import { ProjectsContext } from 'projects/components/ProjectsProvider'
import { createContextHook } from '@increaser/ui/state/createContextHook'

export const useProjects = createContextHook(ProjectsContext, 'ProjectsContext')
