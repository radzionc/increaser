import { ChartXAxis } from '@lib/ui/charts/ChartXAxis'
import { trackedTimeChartConfig } from './config'
import { Match } from '@lib/ui/base/Match'
import { subtractPeriod } from '../utils/subtractPeriod'
import { Text } from '@lib/ui/text'
import { getWeekIndex } from '@lib/utils/time/getWeekIndex'
import { format } from 'date-fns'
import { useLastDataPointStartedAt } from '../hooks/useLastDataPointStartedAt'
import { useCurrentDataSize } from '../hooks/useCurrentDataSize'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'

type Props = {
  containerWidth: number
}

export const TrackedTimeChartXLabels = ({ containerWidth }: Props) => {
  const dataSize = useCurrentDataSize()
  const [timeGrouping] = useTimeGrouping()
  const lastDataPointStartedAt = useLastDataPointStartedAt()

  const getDataPointStartedAt = (index: number) => {
    return subtractPeriod({
      value: lastDataPointStartedAt,
      period: timeGrouping,
      amount: dataSize - index - 1,
    })
  }

  return (
    <ChartXAxis
      dataSize={dataSize}
      containerWidth={containerWidth}
      expectedLabelHeight={trackedTimeChartConfig.expectedXLabelHeight}
      expectedLabelWidth={trackedTimeChartConfig.expectedXLabelWidth}
      renderLabel={(index) => {
        const value = getDataPointStartedAt(index)
        return (
          <Text nowrap color="supporting" size={12} key={index}>
            <Match
              value={timeGrouping}
              week={() => `#${getWeekIndex(value) + 1}`}
              month={() => format(value, 'MMM yyyy')}
              year={() => format(value, 'yyyy')}
              day={() => format(value, 'dd MMM')}
            />
          </Text>
        )
      }}
      labelsMinDistance={4}
      justifyPoints="space-around"
    />
  )
}
