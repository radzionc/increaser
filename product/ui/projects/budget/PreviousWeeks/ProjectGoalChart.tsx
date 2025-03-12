import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { ChartItemInfo } from '@lib/ui/charts/ChartItemInfo'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { LineChart } from '@lib/ui/charts/LineChart'
import { LineChartPositionTracker } from '@lib/ui/charts/LineChart/LineChartPositionTracker'
import { HStack, VStack } from '@lib/ui/css/stack'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { getColor } from '@lib/ui/theme/getters'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { formatWeek, fromWeek } from '@lib/utils/time/Week'
import { toPercents } from '@lib/utils/toPercents'
import { ProjectWeek } from '@product/entities/timeTracking'
import { useCurrentProject } from '@product/ui/projects/CurrentProjectProvider'
import { useState } from 'react'
import styled, { useTheme } from 'styled-components'

const lineChartConfig = {
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

export const ProjectGoalChart = ({ value }: ValueProp<ProjectWeek[]>) => {
  const { allocatedMinutesPerWeek, color } = useCurrentProject()
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

  const { colors } = useTheme()

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        return (
          <VStack fullWidth gap={20} ref={setElement}>
            {size && (
              <>
                <HStack>
                  <Spacer width={lineChartConfig.expectedYAxisLabelWidth} />
                  <ChartItemInfo
                    itemIndex={selectedDataPoint}
                    isVisible={isSelectedDataPointVisible}
                    containerWidth={
                      size.width - lineChartConfig.expectedYAxisLabelWidth
                    }
                    dataPointsNumber={value.length}
                  >
                    <VStack>
                      <Text color="contrast" weight="500">
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
                      <Text color="supporting" size={14} weight="500">
                        {formatWeek(selectedDataPointStartedAt)}
                      </Text>
                    </VStack>
                  </ChartItemInfo>
                </HStack>
                <HStack>
                  <ChartYAxis
                    style={{
                      minWidth: lineChartConfig.expectedYAxisLabelWidth,
                    }}
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
                      color={colors.getLabelColor(color)}
                    />
                    <LineChartPositionTracker
                      data={normalized.done}
                      color={colors.getLabelColor(color)}
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
