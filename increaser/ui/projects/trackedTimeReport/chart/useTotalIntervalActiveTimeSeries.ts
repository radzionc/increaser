import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import { useMemo } from 'react'
import { useActiveProject } from '../activeProject/useActiveProject'
import { useTotalIntervalProjectsTimeSeries } from '../projects/useTotalIntervalProjectsTimeSeries'

export const useTotalIntervalActiveTimeSeries = () => {
  const [activeProjectId] = useActiveProject()

  const projectsTimeSeries = useTotalIntervalProjectsTimeSeries()

  return useMemo(() => {
    if (activeProjectId) {
      return projectsTimeSeries[activeProjectId]
    }

    return mergeSameSizeDataArrays(Object.values(projectsTimeSeries))
  }, [activeProjectId, projectsTimeSeries])
}
