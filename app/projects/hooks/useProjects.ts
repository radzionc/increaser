import { ProjectsContext } from 'projects/components/ProjectsProvider'
import { createContextHook } from 'shared/utils/createContextHook'

export const useProjects = createContextHook(ProjectsContext, 'ProjectsContext')
