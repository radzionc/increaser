import { LineChart } from '@lib/ui/charts/LineChart'
import { HSLA } from '@lib/ui/colors/HSLA'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { ValueProp, WidthProp } from '@lib/ui/props'
import { chartConfig } from './config'

type ChartDescription = {
  data: number[]
  color: HSLA
}

type ComparisonChartLinesProps = ValueProp<ChartDescription[]> & WidthProp
export const ComparisonChartLines = ({
  value,
  width,
}: ComparisonChartLinesProps) => {
  const dataPointsMax = Math.max(...value.map((item) => item.data.length))

  return (
    <>
      {value.map(({ data, color }, index) => (
        <TakeWholeSpaceAbsolutely key={index}>
          <LineChart
            dataPointsConnectionKind="sharp"
            fillKind="none"
            data={data}
            width={width * ((data.length - 1) / (dataPointsMax - 1))}
            height={chartConfig.chartHeight}
            color={color}
          />
        </TakeWholeSpaceAbsolutely>
      ))}
    </>
  )
}
