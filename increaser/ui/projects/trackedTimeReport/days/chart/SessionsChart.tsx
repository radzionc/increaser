import { VStack } from '@lib/ui/css/stack'
import { useMemo } from 'react'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { generateYLabels } from '@lib/ui/charts/utils/generateYLabels'
import { trackedTimeChartConfig } from '../../chart/config'
import { useSelectedIntervalActiveTimeSeries } from '../../chart/useSelectedIntervalActiveTimeSeries'
import { ChartContent } from '../../chart/ChartContent'
import { DataPointSelector } from '../../chart/DataPointSelector'
import { ChartXLabels } from '../../chart/ChartXLabels'
import { ChartContainer } from '../../chart/ChartContainer'

export const SessionsChart = () => {
  const data = useSelectedIntervalActiveTimeSeries()

  const yLabels = useMemo(() => {
    const result = generateYLabels({
      maxValue: convertDuration(Math.max(...data), 's', 'h'),
      stepSizes: [0.25, 0.5, 1, 2, 4, 10, 20, 50, 100, 200, 500, 1000],
    }).map((value) => convertDuration(value, 'h', 's'))

    return result
  }, [data])

  const normalized = normalizeDataArrays({
    data,
    yLabels,
  })

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        return (
          <VStack fullWidth gap={20} ref={setElement}>
            {size && (
              <>
                <ChartContainer>
                  <ChartYAxis
                    expectedLabelWidth={
                      trackedTimeChartConfig.expectedYLabelWidth
                    }
                    renderLabel={() => {
                      return null
                    }}
                    data={normalized.yLabels}
                  />
                  <VStack
                    style={{
                      position: 'relative',
                      minHeight: trackedTimeChartConfig.chartHeight,
                    }}
                    fullWidth
                  >
                    <ChartHorizontalGridLines data={normalized.yLabels} />
                    <ChartContent>coming soon!</ChartContent>
                    <DataPointSelector />
                  </VStack>
                </ChartContainer>

                <ChartXLabels width={size.width} />
              </>
            )}
          </VStack>
        )
      }}
    />
  )
}
