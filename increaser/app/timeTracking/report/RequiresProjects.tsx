import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'

export const RequiresProjects = ({ children }: ComponentWithChildrenProps) => {
  const { projectsTimeSeries } = useTrackedTimeReport()

  const hasData = !isEmpty(getRecordKeys(projectsTimeSeries))

  if (hasData) {
    return <>{children}</>
  }

  return (
    <ShyInfoBlock>
      Create projects and track time to see the report.
    </ShyInfoBlock>
  )
}
