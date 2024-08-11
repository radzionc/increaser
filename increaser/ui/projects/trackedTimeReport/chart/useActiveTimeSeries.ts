import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import { useMemo } from 'react'
import { useProjectsTimeSeries } from '../projects/useProjectsTimeSeries'
import { useActiveProject } from '../activeProject/useActiveProject'

export const useActiveTimeSeries = () => {
  const [activeProjectId] = useActiveProject()

  const projectsTimeSeries = useProjectsTimeSeries()

  return useMemo(() => {
    if (activeProjectId) {
      return projectsTimeSeries[activeProjectId]
    }

    return mergeSameSizeDataArrays(Object.values(projectsTimeSeries))
  }, [activeProjectId, projectsTimeSeries])
}
