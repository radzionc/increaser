import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import { useMemo } from 'react'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'

export const useActiveTimeSeries = () => {
  const { projectsTimeSeries, activeProjectId } = useTrackedTimeReport()

  return useMemo(() => {
    if (activeProjectId) {
      return projectsTimeSeries[activeProjectId]
    }

    return mergeSameSizeDataArrays(Object.values(projectsTimeSeries))
  }, [activeProjectId, projectsTimeSeries])
}
