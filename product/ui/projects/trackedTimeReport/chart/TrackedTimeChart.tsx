import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { VStack } from '@lib/ui/css/stack'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { getColor } from '@lib/ui/theme/getters'
import { order } from '@lib/utils/array/order'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { toPercents } from '@lib/utils/toPercents'
import { generateYLabels } from '@product/ui/charts/utils/generateYLabels'
import { useMemo } from 'react'
import styled from 'styled-components'

import { useActiveBudget } from '../hooks/useActiveBudget'
import { useTimeGrouping } from '../timeGrouping/state'

import { BarChartItem } from './BarChartItem'
import { ChartContainer } from './ChartContainer'
import { ChartContent } from './ChartContent'
import { ChartXLabels } from './ChartXLabels'
import { trackedTimeChartConfig } from './config'
import { DataPointSelector } from './DataPointSelector'
import { useSelectedIntervalActiveTimeSeries } from './useSelectedIntervalActiveTimeSeries'
import { YLabel } from './YLabel'
import { YLabelHighlight } from './YLabelHighlight'

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
                    style={{
                      minWidth: trackedTimeChartConfig.expectedYLabelWidth,
                    }}
                    renderLabel={(index) => {
                      const hours = convertDuration(yLabels[index], 's', 'h')

                      const str = formatDuration(hours, 'h', {
                        maxUnit: 'h',
                      })

                      if (showBudget && yLabels[index] === budget) {
                        return (
                          <YLabelHighlight>
                            <EmphasizeNumbers value={str} />
                            <BudgetOutline />
                          </YLabelHighlight>
                        )
                      }

                      return (
                        <YLabel key={index}>
                          <EmphasizeNumbers value={str} />
                        </YLabel>
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
