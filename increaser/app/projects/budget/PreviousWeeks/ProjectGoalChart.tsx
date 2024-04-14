import { ProjectWeek } from '@increaser/entities/timeTracking'
import { ComponentWithValueProps } from '@lib/ui/props'
import { normalize } from '@lib/utils/math/normalize'
import { useMemo, useState } from 'react'
import { useCurrentProject } from '../../components/ProjectView/CurrentProjectProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Spacer } from '@lib/ui/layout/Spacer'
import { LineChartItemInfo } from '@lib/ui/charts/LineChart/LineChartItemInfo'
import { Text } from '@lib/ui/text'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { format } from 'date-fns'
import { fromWeek } from '@lib/utils/time/Week'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { LineChart } from '@lib/ui/charts/LineChart'
import { LineChartPositionTracker } from '@lib/ui/charts/LineChart/LineChartPositionTracker'
import { getLastItem } from '@lib/utils/array/getLastItem'

export const lineChartConfig = {
  chartHeight: 80,
  expectedYAxisLabelWidth: 40,
  expectedLabelWidth: 58,
  expectedLabelHeight: 18,
  labelsMinDistance: 20,
}

export const ProjectGoalChart = ({
  value,
}: ComponentWithValueProps<ProjectWeek[]>) => {
  const { allocatedMinutesPerWeek, hslaColor } = useCurrentProject()
  const [data, normalizedGoal] = useMemo(() => {
    const dataWithGoal = normalize([
      ...value.map((week) => week.seconds),
      convertDuration(allocatedMinutesPerWeek, 'min', 's'),
    ])

    return [dataWithGoal.slice(0, -1), getLastItem(dataWithGoal)]
  }, [allocatedMinutesPerWeek, value])

  const [selectedDataPoint, setSelectedDataPoint] = useState<number>(
    data.length - 1,
  )
  const [isSelectedDataPointVisible, setIsSelectedDataPointVisible] =
    useState<boolean>(false)

  const selectedDataPointStartedAt = fromWeek(value[selectedDataPoint])

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const yLabels = [allocatedMinutesPerWeek]
        const yLabelsData = [normalizedGoal]

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
                    data={data}
                  >
                    <VStack>
                      <Text color="contrast" weight="semibold">
                        <EmphasizeNumbers
                          value={formatDuration(
                            value[selectedDataPoint].seconds,
                            's',
                            {
                              maxUnit: 'h',
                            },
                          )}
                        />
                      </Text>
                      <Text color="supporting" size={14} weight="semibold">
                        {`${format(
                          selectedDataPointStartedAt,
                          'd MMM',
                        )} - ${format(
                          selectedDataPointStartedAt +
                            convertDuration(1, 'w', 'ms'),
                          'd MMM',
                        )}`}
                      </Text>
                    </VStack>
                  </LineChartItemInfo>
                </HStack>
                <HStack>
                  <ChartYAxis
                    expectedLabelWidth={lineChartConfig.expectedYAxisLabelWidth}
                    renderLabel={(index) => (
                      <Text key={index} size={12} color="supporting">
                        {formatDuration(yLabels[index], 'min', {
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
                    <LineChart
                      dataPointsConnectionKind="sharp"
                      fillKind={'gradient'}
                      data={data}
                      width={
                        size.width - lineChartConfig.expectedYAxisLabelWidth
                      }
                      height={lineChartConfig.chartHeight}
                      color={hslaColor}
                    />
                    <LineChartPositionTracker
                      data={data}
                      color={hslaColor}
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
              </>
            )}
          </VStack>
        )
      }}
    />
  )
}
