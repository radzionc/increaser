import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'

export const RequiresTwoDataPoints = ({
  children,
}: ComponentWithChildrenProps) => {
  const { projectsData, timeGrouping } = useTrackedTimeReport()

  const hasTwoDataPoints = Object.values(projectsData)[0].length > 1

  if (hasTwoDataPoints) {
    return <>{children}</>
  }

  return (
    <ShyInfoBlock>
      You'll gain access to the chart after tracking time for at least two{' '}
      {timeGrouping}s.
    </ShyInfoBlock>
  )
}
