import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import { useMemo } from 'react'
import { useActiveProject } from '../activeProject/useActiveProject'
import { useMaxIntervalProjectsTimeSeries } from '../projects/useMaxIntervalProjectsTimeSeries'

export const useMaxIntervalActiveTimeSeries = () => {
  const [activeProjectId] = useActiveProject()

  const projectsTimeSeries = useMaxIntervalProjectsTimeSeries()

  return useMemo(() => {
    if (activeProjectId) {
      return projectsTimeSeries[activeProjectId]
    }

    return mergeSameSizeDataArrays(Object.values(projectsTimeSeries))
  }, [activeProjectId, projectsTimeSeries])
}
