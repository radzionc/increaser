import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import { useMemo } from 'react'
import { useActiveProject } from '../activeProject/useActiveProject'
import { useSelectedIntervalProjectsTimeSeries } from '../projects/useSelectedIntervalProjectsTimeSeries'

export const useSelectedIntervalActiveTimeSeries = () => {
  const [activeProjectId] = useActiveProject()

  const projectsTimeSeries = useSelectedIntervalProjectsTimeSeries()

  return useMemo(() => {
    if (activeProjectId) {
      return projectsTimeSeries[activeProjectId]
    }

    return mergeSameSizeDataArrays(Object.values(projectsTimeSeries))
  }, [activeProjectId, projectsTimeSeries])
}
