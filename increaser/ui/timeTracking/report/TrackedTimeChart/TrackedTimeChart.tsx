import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled, { useTheme } from 'styled-components'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { trackedTimeChartConfig } from './config'
import { useTrackedTime } from '../state/TrackedTimeContext'
import { useActiveTimeSeries } from '../hooks/useActiveTimeSeries'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { subtractPeriod } from '../utils/subtractPeriod'
import { formatWeek } from '@lib/utils/time/Week'
import { generateYLabels } from '@lib/ui/charts/utils/generateYLabels'
import { HoverTracker } from '@lib/ui/base/HoverTracker'
import { getSegmentIndex } from '@lib/utils/math/getSegmentIndex'
import {
  takeWholeSpaceAbsolutely,
  TakeWholeSpaceAbsolutely,
} from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { toPercents } from '@lib/utils/toPercents'
import { ChartItemInfo } from '@lib/ui/charts/ChartItemInfo'
import { TrackedTimeChartXLabels } from './TrackedTimeChartXLabels'

const Content = styled.div`
  ${takeWholeSpaceAbsolutely};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8px, 1fr));

  align-items: end;
`

const Item = styled.div`
  width: calc(100% - 4px);
  ${borderRadius.s};
`

export const TrackedTimeChart = () => {
  const {
    lastTimeGroupStartedAt,
    timeGrouping,
    activeProjectId,
    dataPointsCount,
  } = useTrackedTimeReport()

  const { projects } = useTrackedTime()

  const data = useActiveTimeSeries()

  const [selectedDataPoint, setSelectedDataPoint] = useState<number>(
    data.length - 1,
  )
  const [isSelectedDataPointVisible, setIsSelectedDataPointVisible] =
    useState<boolean>(false)

  const { colors } = useTheme()
  const color = activeProjectId
    ? projects[activeProjectId].color
    : colors.primary

  const getDataPointStartedAt = (index: number) => {
    return subtractPeriod({
      value: lastTimeGroupStartedAt,
      period: timeGrouping,
      amount: dataPointsCount - index - 1,
    })
  }

  const selectedDataPointStartedAt = getDataPointStartedAt(selectedDataPoint)

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
                  <Spacer width={trackedTimeChartConfig.expectedYLabelWidth} />
                  <ChartItemInfo
                    itemIndex={selectedDataPoint}
                    isVisible={isSelectedDataPointVisible}
                    containerWidth={
                      size.width - trackedTimeChartConfig.expectedYLabelWidth
                    }
                    dataPointsNumber={data.length}
                    justifyPoints="space-around"
                  >
                    <VStack alignItems="center">
                      <Text color="contrast" weight="semibold">
                        <EmphasizeNumbers
                          value={formatDuration(data[selectedDataPoint], 's', {
                            maxUnit: 'h',
                          })}
                        />
                      </Text>
                      <Text color="supporting" size={14} weight="semibold">
                        {match(timeGrouping, {
                          day: () =>
                            format(
                              selectedDataPointStartedAt,
                              'EEE d, MMM yyyy',
                            ),
                          week: () => formatWeek(selectedDataPointStartedAt),
                          month: () =>
                            format(selectedDataPointStartedAt, 'MMMM yyyy'),
                          year: () =>
                            new Date(selectedDataPointStartedAt)
                              .getFullYear()
                              .toString(),
                        })}
                      </Text>
                    </VStack>
                  </ChartItemInfo>
                </HStack>
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

                        const background = isSelectedDataPointVisible
                          ? index === selectedDataPoint
                            ? color
                            : colors.foregroundExtra
                          : color
                        return (
                          <Item
                            style={{
                              background: background.toCssValue(),
                              height,
                            }}
                          />
                        )
                      })}
                    </Content>
                    <HoverTracker
                      onChange={({ position }) => {
                        if (position) {
                          setSelectedDataPoint(
                            getSegmentIndex(data.length, position.x),
                          )
                        }
                        setIsSelectedDataPointVisible(!!position)
                      }}
                      render={({ props }) => (
                        <TakeWholeSpaceAbsolutely {...props} />
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
