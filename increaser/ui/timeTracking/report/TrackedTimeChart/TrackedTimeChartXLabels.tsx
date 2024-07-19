import { ChartXAxis } from '@lib/ui/charts/ChartXAxis'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { trackedTimeChartConfig } from './config'
import { Match } from '@lib/ui/base/Match'
import { subtractPeriod } from '../utils/subtractPeriod'
import { Text } from '@lib/ui/text'
import { getWeekIndex } from '@lib/utils/time/getWeekIndex'
import { format } from 'date-fns'

type Props = {
  containerWidth: number
}

export const TrackedTimeChartXLabels = ({ containerWidth }: Props) => {
  const { lastTimeGroupStartedAt, timeGrouping, dataPointsCount } =
    useTrackedTimeReport()

  const getDataPointStartedAt = (index: number) => {
    return subtractPeriod({
      value: lastTimeGroupStartedAt,
      period: timeGrouping,
      amount: dataPointsCount - index - 1,
    })
  }

  return (
    <ChartXAxis
      dataSize={dataPointsCount}
      containerWidth={containerWidth}
      expectedLabelHeight={trackedTimeChartConfig.expectedXLabelHeight}
      expectedLabelWidth={trackedTimeChartConfig.expectedXLabelWidth}
      renderLabel={(index) => {
        const value = getDataPointStartedAt(index)
        return (
          <Text nowrap color="supporting" size={12} key={index}>
            <Match
              value={timeGrouping}
              week={() => `#${getWeekIndex(value)}`}
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
