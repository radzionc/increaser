import { HStack } from '@lib/ui/css/stack'
import { Spacer } from '@lib/ui/layout/Spacer'
import { trackedTimeChartConfig } from './config'
import { TrackedTimeChartXLabels } from './TrackedTimeChartXLabels'

type ChartXLabelsProps = {
  width: number
}

export const ChartXLabels = ({ width }: ChartXLabelsProps) => {
  return (
    <HStack>
      <Spacer width={trackedTimeChartConfig.expectedYLabelWidth} />
      <TrackedTimeChartXLabels
        containerWidth={width - trackedTimeChartConfig.expectedYLabelWidth}
      />
    </HStack>
  )
}
