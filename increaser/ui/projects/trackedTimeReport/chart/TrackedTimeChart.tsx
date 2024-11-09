import { VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { useMemo } from 'react'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { trackedTimeChartConfig } from './config'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { generateYLabels } from '@lib/ui/charts/utils/generateYLabels'
import { toPercents } from '@lib/utils/toPercents'
import { BarChartItem } from './BarChartItem'
import { useSelectedIntervalActiveTimeSeries } from './useSelectedIntervalActiveTimeSeries'
import { useActiveBudget } from '../hooks/useActiveBudget'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { order } from '@lib/utils/array/order'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { useTimeGrouping } from '../timeGrouping/state'
import { ChartContent } from './ChartContent'
import { DataPointSelector } from './DataPointSelector'
import { ChartXLabels } from './ChartXLabels'
import { ChartContainer } from './ChartContainer'

const BudgetOutline = styled.div`
  ${absoluteOutline(12, 4)};
  ${borderRadius.s};
  background: ${getColor('background')};
  border: 2px solid ${getColor('primary')};
  z-index: -1;
`

const BudgetLine = styled.div`
  width: 100%;
  height: 1px;
  border: 1px dashed ${getColor('primary')};
  z-index: -1;
  pointer-events: none;
`

export const TrackedTimeChart = () => {
  const data = useSelectedIntervalActiveTimeSeries()

  const budget = useActiveBudget()

  const timeGrouping = useTimeGrouping()

  const showBudget = timeGrouping === 'week' && budget !== undefined

  const yLabels = useMemo(() => {
    const result = generateYLabels({
      maxValue: convertDuration(Math.max(...data), 's', 'h'),
      stepSizes: [0.25, 0.5, 1, 2, 4, 10, 20, 50, 100, 200, 500, 1000],
    }).map((value) => convertDuration(value, 'h', 's'))

    if (showBudget) {
      return order(withoutDuplicates([...result, budget]), (v) => v, 'asc')
    }

    return result
  }, [budget, data, showBudget])

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
                  {showBudget && (
                    <PositionAbsolutelyCenterHorizontally
                      top={toPercents(
                        1 - normalized.yLabels[yLabels.indexOf(budget)],
                      )}
                      fullWidth
                    >
                      <BudgetLine />
                    </PositionAbsolutelyCenterHorizontally>
                  )}
                  <ChartYAxis
                    expectedLabelWidth={
                      trackedTimeChartConfig.expectedYLabelWidth
                    }
                    renderLabel={(index) => {
                      const hours = convertDuration(yLabels[index], 's', 'h')

                      const str = formatDuration(hours, 'h', {
                        maxUnit: 'h',
                      })

                      if (showBudget && yLabels[index] === budget) {
                        return (
                          <Text
                            as="div"
                            style={{
                              position: 'relative',
                              isolation: 'isolate',
                            }}
                            key={index}
                            size={12}
                            weight="600"
                            color="contrast"
                          >
                            <EmphasizeNumbers value={str} />
                            <BudgetOutline />
                          </Text>
                        )
                      }

                      return (
                        <Text key={index} size={12} color="supporting">
                          <EmphasizeNumbers value={str} />
                        </Text>
                      )
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
                    <ChartContent>
                      {normalized.data.map((value, index) => {
                        const height = toPercents(value)

                        return (
                          <BarChartItem
                            key={index}
                            index={index}
                            style={{
                              height,
                            }}
                          />
                        )
                      })}
                    </ChartContent>
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
