import { ProjectWeek } from '@increaser/entities/timeTracking'
import { ComponentWithValueProps } from '@lib/ui/props'
import { useState } from 'react'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Spacer } from '@lib/ui/layout/Spacer'
import { LineChartItemInfo } from '@lib/ui/charts/LineChart/LineChartItemInfo'
import { Text } from '@lib/ui/text'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { formatWeek, fromWeek } from '@lib/utils/time/Week'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { LineChart } from '@lib/ui/charts/LineChart'
import { LineChartPositionTracker } from '@lib/ui/charts/LineChart/LineChartPositionTracker'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { toPercents } from '@lib/utils/toPercents'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'

export const lineChartConfig = {
  chartHeight: 80,
  expectedYAxisLabelWidth: 32,
  expectedLabelWidth: 58,
  expectedLabelHeight: 18,
  labelsMinDistance: 20,
}

const Line = styled.div`
  border-bottom: 1px dashed ${getColor('textShy')};
  width: 100%;
  pointer-events: none;
`

export const ProjectGoalChart = ({
  value,
}: ComponentWithValueProps<ProjectWeek[]>) => {
  const { allocatedMinutesPerWeek, hslaColor } = useCurrentProject()
  const targets = [convertDuration(allocatedMinutesPerWeek, 'min', 's')]
  const normalized = normalizeDataArrays({
    done: value.map((week) => week.seconds),
    targets,
  })

  const [selectedDataPoint, setSelectedDataPoint] = useState<number>(
    value.length - 1,
  )
  const [isSelectedDataPointVisible, setIsSelectedDataPointVisible] =
    useState<boolean>(false)

  const selectedDataPointStartedAt = fromWeek(value[selectedDataPoint])

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
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
                    dataPointsNumber={value.length}
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
                        {formatWeek(selectedDataPointStartedAt)}
                      </Text>
                    </VStack>
                  </LineChartItemInfo>
                </HStack>
                <HStack>
                  <ChartYAxis
                    expectedLabelWidth={lineChartConfig.expectedYAxisLabelWidth}
                    renderLabel={(index) => (
                      <Text key={index} size={12} color="supporting">
                        {formatDuration(targets[index], 's', {
                          maxUnit: 'h',
                          minUnit: 'h',
                        })}
                      </Text>
                    )}
                    data={normalized.targets}
                  />
                  <VStack
                    style={{
                      position: 'relative',
                      minHeight: lineChartConfig.chartHeight,
                    }}
                    fullWidth
                  >
                    <PositionAbsolutelyCenterHorizontally
                      top={toPercents(1 - normalized.targets[0])}
                      fullWidth
                    >
                      <Line />
                    </PositionAbsolutelyCenterHorizontally>
                    <LineChart
                      dataPointsConnectionKind="sharp"
                      fillKind={'gradient'}
                      data={normalized.done}
                      width={
                        size.width - lineChartConfig.expectedYAxisLabelWidth
                      }
                      height={lineChartConfig.chartHeight}
                      color={hslaColor}
                    />
                    <LineChartPositionTracker
                      data={normalized.done}
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
