import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import { useMemo } from 'react'
import { useTrackedTimeReportPreferences } from '../state/useTrackedTimeReportPreferences'
import { useProjectsTimeSeries } from './useProjectsTimeSeries'

export const useActiveTimeSeries = () => {
  const [{ activeProjectId }] = useTrackedTimeReportPreferences()

  const projectsTimeSeries = useProjectsTimeSeries()

  return useMemo(() => {
    if (activeProjectId) {
      return projectsTimeSeries[activeProjectId]
    }

    return mergeSameSizeDataArrays(Object.values(projectsTimeSeries))
  }, [activeProjectId, projectsTimeSeries])
}
