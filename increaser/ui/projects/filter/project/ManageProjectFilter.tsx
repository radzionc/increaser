import { ClearProjectFilter } from './ClearProjectFilter'
import { SetProjectFilter } from './SetProjectFilter'
import { useProjectFilter } from './state/projectFilter'

export const ManageProjectFilter = () => {
  const [projectId] = useProjectFilter()

  return projectId ? <ClearProjectFilter /> : <SetProjectFilter />
}
