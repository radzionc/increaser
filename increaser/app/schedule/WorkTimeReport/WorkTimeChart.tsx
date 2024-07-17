import { useMemo, useState } from 'react'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Spacer } from '@lib/ui/layout/Spacer'
import { LineChartItemInfo } from '@lib/ui/charts/LineChart/LineChartItemInfo'
import { Text } from '@lib/ui/text'
import { toPercents } from '@lib/utils/toPercents'
import styled from 'styled-components'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { format } from 'date-fns'
import { useWorkTimeReportStartedAt } from './hooks/useWorkTimeReportStartedAt'
import { useWorkTimeReportDays } from './hooks/useWorkTimeReportDays'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { HoverTracker } from '@lib/ui/base/HoverTracker'
import { getSegmentIndex } from '@lib/utils/math/getSegmentIndex'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { ChartXAxis } from '@lib/ui/charts/ChartXAxis'
import { centerContent } from '@lib/ui/css/centerContent'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { ComponentWithActiveState } from '@lib/ui/props'
import { WorkTimeChartYLabels } from './WorkTimeChartYLabels'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { withoutNulls } from '@lib/utils/array/withoutNulls'

export const chartConfig = {
  chartHeight: 360,
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
  ${takeWholeSpace};
  ${centerContent};
  position: relative;
`

const Item = styled.div<ComponentWithActiveState>`
  position: absolute;
  width: calc(100% - 4px);
  ${borderRadius.s};
  background: ${matchColor('isActive', {
    true: 'primary',
    false: 'mistExtra',
  })};
`

const Line = styled.div`
  border-bottom: 1px solid ${getColor('textShy')};
  width: 100%;
  pointer-events: none;
`

export const WorkTimeChart = () => {
  const reportStartedAt = useWorkTimeReportStartedAt()
  const days = useWorkTimeReportDays()
  const workDays = useMemo(() => withoutNulls(days), [days])
  const { startWorkAt, finishWorkAt } = useAssertUserState()

  const boundaries = useMemo(() => {
    return [
      Math.min(
        convertDuration(
          Math.floor(
            Math.min(...workDays.map(({ start }) => start)) /
              convertDuration(1, 'h', 'min'),
          ),
          'h',
          'min',
        ),
        startWorkAt,
      ),
      Math.max(
        convertDuration(
          Math.ceil(
            Math.max(...workDays.map(({ end }) => end)) /
              convertDuration(1, 'h', 'min'),
          ),
          'h',
          'min',
        ),
        finishWorkAt,
      ),
    ]
  }, [workDays, startWorkAt, finishWorkAt])

  const dayMoments = [startWorkAt, finishWorkAt]

  const normalized = normalizeDataArrays({
    days: workDays.flatMap(({ start, end }) => [start, end]),
    boundaries,
    dayMoments,
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
                        {selectedDay ? (
                          <>
                            {formatDailyEventTime(selectedDay.start)} -{' '}
                            <Text
                              as="span"
                              color={
                                selectedDay.end > finishWorkAt
                                  ? 'idle'
                                  : undefined
                              }
                            >
                              {formatDailyEventTime(selectedDay.end)}
                            </Text>
                          </>
                        ) : (
                          '-'
                        )}
                      </Text>
                      <Text color="supporting" size={14} weight="semibold">
                        {format(selectedDataPointStartedAt, 'EEE d, MMM yyyy')}
                      </Text>
                    </VStack>
                  </LineChartItemInfo>
                </HStack>
                <HStack gap={20}>
                  <VStack style={{ flex: 1 }}>
                    <WorkTimeChartYLabels
                      start={boundaries[0]}
                      end={boundaries[1]}
                    />
                  </VStack>
                  <VStack
                    style={{
                      position: 'relative',
                      minHeight: chartConfig.chartHeight,
                    }}
                    fullWidth
                  >
                    {normalized.dayMoments.map((moment) => (
                      <PositionAbsolutelyCenterHorizontally
                        top={toPercents(1 - moment)}
                        fullWidth
                        key={moment}
                      >
                        <Line />
                      </PositionAbsolutelyCenterHorizontally>
                    ))}
                    <Content>
                      {days.map((day, index) => {
                        if (!day) return null

                        const workDayIndex = workDays.indexOf(day)
                        const start = normalized.days[workDayIndex * 2]
                        const end = normalized.days[workDayIndex * 2 + 1]
                        const height = toPercents(end - start)
                        const bottom = toPercents(start)

                        return (
                          <ItemContainer key={index}>
                            <Item
                              isActive={
                                index === selectedDataPoint &&
                                isSelectedDataPointVisible
                              }
                              style={{
                                bottom,
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
                            getSegmentIndex(days.length, position.x),
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
