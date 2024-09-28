import { ChartXAxis } from '@lib/ui/charts/ChartXAxis'
import { trackedTimeChartConfig } from './config'
import { TrackedTimeChartXLabel } from './TrackedTimeChartXLabel'
import { useSelectedIntervalLength } from '../interval/useSelectedIntervalLength'

type Props = {
  containerWidth: number
}

export const TrackedTimeChartXLabels = ({ containerWidth }: Props) => {
  const dataSize = useSelectedIntervalLength()

  return (
    <ChartXAxis
      dataSize={dataSize}
      containerWidth={containerWidth}
      expectedLabelHeight={trackedTimeChartConfig.expectedXLabelHeight}
      expectedLabelWidth={trackedTimeChartConfig.expectedXLabelWidth}
      renderLabel={(index) => (
        <TrackedTimeChartXLabel key={index} index={index} />
      )}
      labelsMinDistance={4}
      justifyPoints="space-around"
    />
  )
}
