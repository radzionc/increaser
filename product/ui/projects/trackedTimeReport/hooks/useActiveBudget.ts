import { convertDuration } from '@lib/utils/time/convertDuration'
import { getWorkBudgetTotal } from '@product/entities-utils/workBudget/getWorkBudgetTotal'

import { useUser } from '../../../user/state/user'
import { useWorkBudget } from '../../../workBudget/hooks/useWorkBudget'
import { useActiveProject } from '../activeProject/useActiveProject'
import { useTrackedProjects } from '../projects/TrackedProjectsProvider'

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
