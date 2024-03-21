import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { useTheme } from 'styled-components'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { useMemo, useState } from 'react'
import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import { addMonths, format } from 'date-fns'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { normalize } from '@lib/utils/math/normalize'
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

export const TimeChart = () => {
  const {
    projectsData,
    firstTimeGroupStartedAt,
    timeGrouping,
    activeProjectId,
  } = useTrackedTimeReport()

  const { projectsRecord } = useProjects()

  const totals = useMemo(() => {
    if (activeProjectId) {
      return projectsData[activeProjectId]
    }

    return mergeSameSizeDataArrays(Object.values(projectsData))
  }, [activeProjectId, projectsData])

  const [selectedDataPoint, setSelectedDataPoint] = useState<number>(
    totals.length - 1,
  )
  const [isSelectedDataPointVisible, setIsSelectedDataPointVisible] =
    useState<boolean>(false)

  const { colors } = useTheme()
  const color = activeProjectId
    ? projectsRecord[activeProjectId].hslaColor
    : colors.primary

  const getDataPointStartedAt = (index: number) =>
    match(timeGrouping, {
      day: () => firstTimeGroupStartedAt + convertDuration(index, 'd', 'ms'),
      week: () => firstTimeGroupStartedAt + convertDuration(index, 'w', 'ms'),
      month: () => addMonths(firstTimeGroupStartedAt, index).getTime(),
    })

  const selectedDataPointStartedAt = getDataPointStartedAt(selectedDataPoint)

  const [chartMinValue, chartMaxValue] = useMemo(() => {
    const minValue = Math.min(...totals)
    const maxValue = Math.max(...totals)

    return [
      Math.floor(convertDuration(minValue, 's', 'h')),
      Math.ceil(convertDuration(maxValue, 's', 'h')),
    ].map((value) => convertDuration(value, 'h', 's'))
  }, [totals])

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const data = normalize([...totals, chartMinValue, chartMaxValue]).slice(
          0,
          -2,
        )

        const yLabels = [chartMinValue, chartMaxValue]
        const yLabelsData = normalize([chartMinValue, chartMaxValue])

        return (
          <VStack fullWidth gap={20} ref={setElement}>
            {size && (
              <>
                <HStack>
                  <Spacer width={lineChartConfig.expectedYAxisLabelWidth} />
                  <LineChartItemInfo
                    itemIndex={selectedDataPoint}
                    isVisible={isSelectedDataPointVisible}
                    containerWidth={size.width}
                    data={data}
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
                          week: () =>
                            `${format(
                              selectedDataPointStartedAt,
                              'd MMM',
                            )} - ${format(
                              selectedDataPointStartedAt +
                                convertDuration(1, 'w', 'ms'),
                              'd MMM',
                            )}`,
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
                    renderLabel={(index) => (
                      <Text key={index} size={12} color="supporting">
                        {formatDuration(yLabels[index], 's', {
                          maxUnit: 'h',
                          minUnit: 'h',
                        })}
                      </Text>
                    )}
                    data={yLabelsData}
                  />
                  <VStack
                    style={{
                      position: 'relative',
                      minHeight: lineChartConfig.chartHeight,
                    }}
                    fullWidth
                  >
                    <ChartHorizontalGridLines data={yLabelsData} />
                    <ProjectsLineCharts
                      chartMin={chartMinValue}
                      chartMax={chartMaxValue}
                      width={
                        size.width - lineChartConfig.expectedYAxisLabelWidth
                      }
                    />
                    <LineChartPositionTracker
                      data={data}
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
                    data={data}
                    expectedLabelWidth={lineChartConfig.expectedLabelWidth}
                    labelsMinDistance={lineChartConfig.labelsMinDistance}
                    containerWidth={size.width}
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
