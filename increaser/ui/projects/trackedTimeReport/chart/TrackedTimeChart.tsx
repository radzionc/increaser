import { HStack, VStack } from '@lib/ui/css/stack'
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
import { useActiveTimeSeries } from './useActiveTimeSeries'
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

const Content = styled.div`
  ${takeWholeSpaceAbsolutely};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8px, 1fr));

  align-items: end;
`

export const TrackedTimeChart = () => {
  const data = useActiveTimeSeries()

  const [activeIndex, setActiveIndex] = useActiveItemIndex()

  const yLabels = useMemo(() => {
    const hourLabels = generateYLabels({
      maxValue: convertDuration(Math.max(...data), 's', 'h'),
      stepSizes: [0.25, 0.5, 1, 2, 4, 10, 20, 50, 100, 200, 500, 1000],
    })

    return hourLabels.map((value) => convertDuration(value, 'h', 's'))
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
                <HStack>
                  <ChartYAxis
                    expectedLabelWidth={
                      trackedTimeChartConfig.expectedYLabelWidth
                    }
                    renderLabel={(index) => {
                      const hours = convertDuration(yLabels[index], 's', 'h')

                      const str = formatDuration(hours, 'h', {
                        maxUnit: 'h',
                      })
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
                            {clientPosition && activeIndex !== null && (
                              <DataPointInfo position={clientPosition} />
                            )}
                          </TakeWholeSpaceAbsolutely>
                        </>
                      )}
                    />
                  </VStack>
                </HStack>

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
