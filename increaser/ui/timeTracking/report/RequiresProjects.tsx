import { useTrackedTimeReport } from './state/TrackedTimeReportContext'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'

export const RequiresProjects = ({ children }: ComponentWithChildrenProps) => {
  const { dataPointsCount } = useTrackedTimeReport()

  const hasData = dataPointsCount > 0

  if (hasData) {
    return <>{children}</>
  }

  return (
    <ShyInfoBlock>
      Create projects and track time to see the report.
    </ShyInfoBlock>
  )
}
