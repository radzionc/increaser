import { useMemo, useState } from 'react'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Spacer } from '@lib/ui/layout/Spacer'
import { LineChartItemInfo } from '@lib/ui/charts/LineChart/LineChartItemInfo'
import { Text } from '@lib/ui/text'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { toPercents } from '@lib/utils/toPercents'
import styled from 'styled-components'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { getColor } from '@lib/ui/theme/getters'
import { format } from 'date-fns'
import { useWorkTimeReportStartedAt } from './hooks/useWorkTimeReportStartedAt'
import { useWorkTimeReportDays } from './hooks/useWorkTimeReportDays'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { HoverTracker } from '@lib/ui/base/HoverTracker'
import { getClosestItemIndex } from '@lib/utils/math/getClosestItemIndex'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { round } from '@lib/ui/css/round'
import { ChartXAxis } from '@lib/ui/charts/ChartXAxis'

export const chartConfig = {
  chartHeight: 320,
  expectedYAxisLabelWidth: 32,
  expectedLabelWidth: 58,
  expectedLabelHeight: 18,
  labelsMinDistance: 20,
}

const Content = styled.div`
  ${takeWholeSpace};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  justify-items: center;
`

const ItemContainer = styled.div`
  height: 100%;
  position: relative;
`

const Item = styled.div`
  position: absolute;
  width: 4px;
  ${round};
  background: ${getColor('primary')};
`

export const WorkTimeChart = () => {
  const reportStartedAt = useWorkTimeReportStartedAt()
  const days = useWorkTimeReportDays()
  const workDays = useMemo(() => days.filter((day) => day !== null), [days])
  const { startWorkAt, finishWorkAt } = useAssertUserState()

  const boundaries = [startWorkAt, finishWorkAt]
  const normalized = normalizeDataArrays({
    days: workDays.flatMap(({ start, end }) => [start, end]),
    boundaries,
  })

  const defaultDataPoint = days.length - 1
  const [selectedDataPoint, setSelectedDataPoint] =
    useState<number>(defaultDataPoint)
  const [isSelectedDataPointVisible, setIsSelectedDataPointVisible] =
    useState<boolean>(false)

  const selectedDataPointStartedAt =
    reportStartedAt + convertDuration(selectedDataPoint, 'd', 'ms')

  const selectedDay = days[selectedDataPoint]

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        return (
          <VStack fullWidth gap={20} ref={setElement}>
            {size && (
              <>
                <HStack>
                  <Spacer width={chartConfig.expectedYAxisLabelWidth} />
                  <LineChartItemInfo
                    itemIndex={selectedDataPoint}
                    isVisible={isSelectedDataPointVisible}
                    containerWidth={
                      size.width - chartConfig.expectedYAxisLabelWidth
                    }
                    dataPointsNumber={days.length}
                  >
                    <VStack>
                      <Text color="contrast" weight="semibold">
                        {selectedDay
                          ? `${formatDailyEventTime(
                              selectedDay.start,
                            )} - ${formatDailyEventTime(selectedDay.end)}`
                          : '-'}
                      </Text>
                      <Text color="supporting" size={14} weight="semibold">
                        {format(selectedDataPointStartedAt, 'EEE d, MMM yyyy')}
                      </Text>
                    </VStack>
                  </LineChartItemInfo>
                </HStack>
                <HStack>
                  <ChartYAxis
                    expectedLabelWidth={chartConfig.expectedYAxisLabelWidth}
                    renderLabel={(index) => (
                      <Text key={index} size={12} color="supporting">
                        {formatDailyEventTime(boundaries[index])}
                      </Text>
                    )}
                    data={normalized.boundaries}
                  />
                  <VStack
                    style={{
                      position: 'relative',
                      minHeight: chartConfig.chartHeight,
                    }}
                    fullWidth
                  >
                    <Content>
                      {days.map((day, index) => {
                        if (!day) return null

                        const workDayIndex = workDays.indexOf(day)
                        const start = normalized.days[workDayIndex * 2]
                        const end = normalized.days[workDayIndex * 2 + 1]
                        const height = toPercents(end - start)
                        const top = toPercents(start)

                        return (
                          <ItemContainer key={index}>
                            <Item
                              style={{
                                top,
                                height,
                              }}
                            />
                          </ItemContainer>
                        )
                      })}
                    </Content>

                    <HoverTracker
                      onChange={({ position }) => {
                        if (position) {
                          setSelectedDataPoint(
                            getClosestItemIndex(days.length, position.x),
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
                  <Spacer width={chartConfig.expectedYAxisLabelWidth} />
                  <ChartXAxis
                    dataSize={days.length}
                    expectedLabelWidth={chartConfig.expectedLabelWidth}
                    labelsMinDistance={chartConfig.labelsMinDistance}
                    containerWidth={
                      size.width - chartConfig.expectedYAxisLabelWidth
                    }
                    expectedLabelHeight={chartConfig.expectedLabelHeight}
                    renderLabel={(index) => {
                      const startedAt =
                        reportStartedAt + convertDuration(index, 'd', 'ms')

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
