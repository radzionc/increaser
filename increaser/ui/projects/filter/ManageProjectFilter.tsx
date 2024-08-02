import { useProjectFilter } from './ProjectFilterProvider'
import { ClearProjectFilter } from './ClearProjectFilter'
import { SetProjectFilter } from './SetProjectFilter'

export const ManageProjectFilter = () => {
  const [projectId] = useProjectFilter()

  return projectId ? <ClearProjectFilter /> : <SetProjectFilter />
}
