import { useActiveProject } from './activeProject/useActiveProject'
import { TrackedEntityIndicator } from './TrackedEntityIndicator'

export const TrackedTimeChartTitle = () => {
  const [projectId] = useActiveProject()

  return <TrackedEntityIndicator value={projectId} />
}
