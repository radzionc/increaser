import { getWorkBudgetTotal } from '@increaser/entities-utils/workBudget/getWorkBudgetTotal'
import { useWorkBudget } from '../../../workBudget/hooks/useWorkBudget'
import { useActiveProject } from '../activeProject/useActiveProject'
import { useTrackedProjects } from '../projects/TrackedProjectsProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useUser } from '../../../user/state/user'

export const useActiveBudget = () => {
  const [projectId] = useActiveProject()

  const workBudget = useWorkBudget()

  const { weekends } = useUser()

  const projects = useTrackedProjects()

  const project = projectId ? projects[projectId] : null

  if (project) {
    return project.budget
  }

  return convertDuration(
    getWorkBudgetTotal({
      ...workBudget,
      weekends,
    }),
    'h',
    's',
  )
}
