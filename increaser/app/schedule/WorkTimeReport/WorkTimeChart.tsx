import { useMemo, useState } from 'react'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { HStack, VStack } from '@lib/ui/css/stack'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ChartItemInfo } from '@lib/ui/charts/ChartItemInfo'
import { Text } from '@lib/ui/text'
import { toPercents } from '@lib/utils/toPercents'
import styled from 'styled-components'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { format } from 'date-fns'
import { useWorkTimeReportStartedAt } from './hooks/useWorkTimeReportStartedAt'
import { useWorkTimeReportDays } from './hooks/useWorkTimeReportDays'
import { useUser } from '@increaser/ui/user/state/user'
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
import { withoutNull } from '@lib/utils/array/withoutNull'
import { isEmpty } from '@lib/utils/array/isEmpty'

const chartConfig = {
  chartHeight: 360,
  expectedYAxisLabelWidth: 48,
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

const Row = styled(HStack)`
  gap: 20px;
`

export const WorkTimeChart = () => {
  const reportStartedAt = useWorkTimeReportStartedAt()
  const days = useWorkTimeReportDays()
  const workDays = useMemo(() => withoutNull(days), [days])
  const { startWorkAt, finishWorkAt } = useUser()

  const interval = useMemo(() => {
    const startOptions = [startWorkAt]
    if (!isEmpty(workDays)) {
      startOptions.push(Math.min(...workDays.map(({ start }) => start)))
    }

    const start = Math.min(
      ...startOptions.map((value) =>
        convertDuration(
          Math.floor(value / convertDuration(1, 'h', 'min')),
          'h',
          'min',
        ),
      ),
    )

    const endOptions = [finishWorkAt]
    if (!isEmpty(workDays)) {
      endOptions.push(Math.max(...workDays.map(({ end }) => end)))
    }

    const end = Math.max(
      ...endOptions.map((value) =>
        convertDuration(
          Math.ceil(value / convertDuration(1, 'h', 'min')),
          'h',
          'min',
        ),
      ),
    )

    return { start, end }
  }, [workDays, startWorkAt, finishWorkAt])

  const dayMoments = [startWorkAt, finishWorkAt]

  const normalized = normalizeDataArrays({
    days: workDays.flatMap(({ start, end }) => [start, end]),
    boundaries: Object.values(interval),
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
                <Row>
                  <Spacer width={chartConfig.expectedYAxisLabelWidth} />
                  <ChartItemInfo
                    itemIndex={selectedDataPoint}
                    isVisible={isSelectedDataPointVisible}
                    containerWidth={
                      size.width - chartConfig.expectedYAxisLabelWidth
                    }
                    dataPointsNumber={days.length}
                    justifyPoints="space-around"
                  >
                    <VStack>
                      <Text color="contrast" weight="500">
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
                      <Text color="supporting" size={14} weight="500">
                        {format(selectedDataPointStartedAt, 'EEE d, MMM yyyy')}
                      </Text>
                    </VStack>
                  </ChartItemInfo>
                </Row>
                <Row>
                  <VStack style={{ flex: 1 }}>
                    <WorkTimeChartYLabels {...interval} />
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
                </Row>
                <Row>
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
                </Row>
              </>
            )}
          </VStack>
        )
      }}
    />
  )
}
