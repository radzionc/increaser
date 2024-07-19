import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useTheme } from 'styled-components'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { useCallback, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { LineChartItemInfo } from '@lib/ui/charts/LineChart/LineChartItemInfo'
import { ChartXAxis } from '@lib/ui/charts/ChartXAxis'
import { LineChartPositionTracker } from '@lib/ui/charts/LineChart/LineChartPositionTracker'
import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { lineChartConfig } from './lineChartConfig'
import { ProjectsLineCharts } from './ProjectsLineCharts'
import { useTrackedTime } from '../state/TrackedTimeContext'
import { useActiveTimeSeries } from '../hooks/useActiveTimeSeries'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { subtractPeriod } from '../utils/subtractPeriod'
import { formatWeek } from '@lib/utils/time/Week'
import { generateYLabels } from '@lib/ui/charts/utils/generateYLabels'

export const ProjectsTimeSeriesChart = () => {
  const {
    lastTimeGroupStartedAt,
    timeGrouping,
    activeProjectId,
    dataPointsCount,
  } = useTrackedTimeReport()

  const { projects } = useTrackedTime()

  const totals = useActiveTimeSeries()

  const [selectedDataPoint, setSelectedDataPoint] = useState<number>(
    totals.length - 1,
  )
  const [isSelectedDataPointVisible, setIsSelectedDataPointVisible] =
    useState<boolean>(false)

  const { colors } = useTheme()
  const color = activeProjectId
    ? projects[activeProjectId].hslaColor
    : colors.transparent

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
      maxValue: convertDuration(Math.max(...totals), 's', 'h'),
      stepSizes: [0.25, 0.5, 1, 2, 4, 10, 20, 50, 100, 200, 500, 1000],
    })

    return hourLabels.map((value) => convertDuration(value, 'h', 's'))
  }, [totals])

  const normalize = useCallback(
    (data: number[]) => {
      const normalized = normalizeDataArrays({
        data,
        yLabels,
      })
      return normalized.data
    },
    [yLabels],
  )

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const normalized = normalizeDataArrays({
          totals,
          yLabels,
        })

        return (
          <VStack fullWidth gap={20} ref={setElement}>
            {size && (
              <>
                <HStack>
                  <Spacer width={lineChartConfig.expectedYAxisLabelWidth} />
                  <LineChartItemInfo
                    itemIndex={selectedDataPoint}
                    isVisible={isSelectedDataPointVisible}
                    containerWidth={
                      size.width - lineChartConfig.expectedYAxisLabelWidth
                    }
                    dataPointsNumber={totals.length}
                  >
                    <VStack>
                      <Text color="contrast" weight="semibold">
                        <EmphasizeNumbers
                          value={formatDuration(
                            totals[selectedDataPoint],
                            's',
                            {
                              maxUnit: 'h',
                            },
                          )}
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
                        })}
                      </Text>
                    </VStack>
                  </LineChartItemInfo>
                </HStack>
                <HStack>
                  <ChartYAxis
                    expectedLabelWidth={lineChartConfig.expectedYAxisLabelWidth}
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
                      minHeight: lineChartConfig.chartHeight,
                    }}
                    fullWidth
                  >
                    <ChartHorizontalGridLines data={normalized.yLabels} />
                    <ProjectsLineCharts
                      normalize={normalize}
                      width={
                        size.width - lineChartConfig.expectedYAxisLabelWidth
                      }
                    />
                    <LineChartPositionTracker
                      data={normalized.totals}
                      color={color}
                      onChange={(index) => {
                        if (index === null) {
                          setIsSelectedDataPointVisible(false)
                        } else {
                          setIsSelectedDataPointVisible(true)
                          setSelectedDataPoint(index)
                        }
                      }}
                    />
                  </VStack>
                </HStack>

                <HStack>
                  <Spacer width={lineChartConfig.expectedYAxisLabelWidth} />
                  <ChartXAxis
                    dataSize={normalized.totals.length}
                    expectedLabelWidth={lineChartConfig.expectedLabelWidth}
                    labelsMinDistance={lineChartConfig.labelsMinDistance}
                    containerWidth={
                      size.width - lineChartConfig.expectedYAxisLabelWidth
                    }
                    expectedLabelHeight={lineChartConfig.expectedLabelHeight}
                    renderLabel={(index) => {
                      const startedAt = getDataPointStartedAt(index)

                      return (
                        <Text size={12} color="supporting" nowrap>
                          {format(startedAt, 'd MMM')}
                        </Text>
                      )
                    }}
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
