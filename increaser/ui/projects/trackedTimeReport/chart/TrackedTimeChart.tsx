import { hStack, HStack, VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { useMemo } from 'react'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { trackedTimeChartConfig } from './config'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { generateYLabels } from '@lib/ui/charts/utils/generateYLabels'
import { HoverTracker } from '@lib/ui/base/HoverTracker'
import { getSegmentIndex } from '@lib/utils/math/getSegmentIndex'
import {
  takeWholeSpaceAbsolutely,
  TakeWholeSpaceAbsolutely,
} from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { toPercents } from '@lib/utils/toPercents'
import { TrackedTimeChartXLabels } from './TrackedTimeChartXLabels'
import { DataPointInfo } from './DataPointInfo'
import { useActiveItemIndex } from '@lib/ui/list/ActiveItemIndexProvider'
import { BarChartItem } from './BarChartItem'
import { useSelectedIntervalActiveTimeSeries } from './useSelectedIntervalActiveTimeSeries'
import { useActiveBudget } from '../hooks/useActiveBudget'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { order } from '@lib/utils/array/order'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { BodyPortal } from '@lib/ui/dom/BodyPortal'

const Content = styled.div`
  ${takeWholeSpaceAbsolutely};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8px, 1fr));

  align-items: end;
`

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

const Container = styled.div`
  ${hStack()};
  position: relative;
  isolation: isolate;
`

export const TrackedTimeChart = () => {
  const data = useSelectedIntervalActiveTimeSeries()

  const [activeIndex, setActiveIndex] = useActiveItemIndex()

  const budget = useActiveBudget()

  const [timeGroup] = useTimeGrouping()

  const showBudget = timeGroup === 'week' && budget !== undefined

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
                <Container>
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
                    <Content>
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
                    </Content>
                    <HoverTracker
                      onChange={({ position }) => {
                        if (position) {
                          setActiveIndex(
                            getSegmentIndex(data.length, position.x),
                          )
                        } else {
                          setActiveIndex(null)
                        }
                      }}
                      render={({ props, clientPosition }) => (
                        <>
                          <TakeWholeSpaceAbsolutely {...props}>
                            <BodyPortal>
                              {clientPosition && activeIndex !== null && (
                                <DataPointInfo position={clientPosition} />
                              )}
                            </BodyPortal>
                          </TakeWholeSpaceAbsolutely>
                        </>
                      )}
                    />
                  </VStack>
                </Container>

                <HStack>
                  <Spacer width={trackedTimeChartConfig.expectedYLabelWidth} />
                  <TrackedTimeChartXLabels
                    containerWidth={
                      size.width - trackedTimeChartConfig.expectedYLabelWidth
                    }
                  />
                </HStack>
              </>
            )}
          </VStack>
        )
      }}
    />
  )
}
