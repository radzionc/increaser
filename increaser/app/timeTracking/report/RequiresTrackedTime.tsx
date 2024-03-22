import { useMemo } from 'react'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'

export const RequiresTrackedTime = ({
  children,
}: ComponentWithChildrenProps) => {
  const { projectsData, activeProjectId } = useTrackedTimeReport()

  const totals = useMemo(() => {
    if (activeProjectId) {
      return projectsData[activeProjectId]
    }

    return mergeSameSizeDataArrays(Object.values(projectsData))
  }, [activeProjectId, projectsData])

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
