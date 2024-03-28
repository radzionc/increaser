import { useMemo } from 'react'
import { useTrackedTimeReport } from './state/TrackedTimeReportContext'
import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'

export const RequiresTrackedTime = ({
  children,
}: ComponentWithChildrenProps) => {
  const { projectsTimeSeries, activeProjectId } = useTrackedTimeReport()

  const totals = useMemo(() => {
    if (activeProjectId) {
      return projectsTimeSeries[activeProjectId]
    }

    return mergeSameSizeDataArrays(Object.values(projectsTimeSeries))
  }, [activeProjectId, projectsTimeSeries])

  const hasData = totals.some((total) => total > 0)

  if (hasData) {
    return <>{children}</>
  }

  return (
    <ShyInfoBlock>
      There is no tracked time for the selected period.
    </ShyInfoBlock>
  )
}
