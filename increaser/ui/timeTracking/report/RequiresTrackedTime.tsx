import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { useActiveTimeSeries } from './hooks/useActiveTimeSeries'

export const RequiresTrackedTime = ({
  children,
}: ComponentWithChildrenProps) => {
  const totals = useActiveTimeSeries()

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
