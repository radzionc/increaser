import { getWorkBudgetTotal } from '@increaser/entities-utils/workBudget/getWorkBudgetTotal'
import { useWorkBudget } from '../../../workBudget/hooks/useWorkBudget'
import { useActiveProject } from '../activeProject/useActiveProject'
import { useTrackedProjects } from '../projects/TrackedProjectsProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const useActiveBudget = () => {
  const [projectId] = useActiveProject()

  const workBudget = useWorkBudget()

  const projects = useTrackedProjects()

  const project = projectId ? projects[projectId] : null

  if (project) {
    return project.budget
  }

  return convertDuration(getWorkBudgetTotal(workBudget), 'h', 's')
}
