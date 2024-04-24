import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { SectionTitle } from '@lib/ui/text/SectionTitle'
import { useMemo, useState } from 'react'
import { useWeekTimeAllocation } from '../weekTimeAllocation/hooks/useWeekTimeAllocation'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { useCurrentWeekSets } from '@increaser/ui/sets/hooks/useCurrentWeekSets'
import { range } from '@lib/utils/array/range'
import { getDaySets } from '../sets/helpers/getDaySets'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getSetsSum } from '../sets/helpers/getSetsSum'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { LineChart } from '@lib/ui/charts/LineChart'
import styled, { useTheme } from 'styled-components'
import { normalize } from '@lib/utils/math/normalize'
import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { ElementSize } from '@lib/ui/hooks/useElementSize'
import { PositionAbsolutelyCenterVertically } from '@lib/ui/layout/PositionAbsolutelyCenterVertically'
import { D_IN_WEEK, getShortWeekday } from '@lib/utils/time'
import { toPercents } from '@lib/utils/toPercents'
import { Spacer } from '@lib/ui/layout/Spacer'
import { LineChartItemInfo } from '@lib/ui/charts/LineChart/LineChartItemInfo'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { LineChartPositionTracker } from '@lib/ui/charts/LineChart/LineChartPositionTracker'
import { LabeledValue } from '@lib/ui/text/LabeledValue'

export const lineChartConfig = {
  chartHeight: 160,
  expectedYAxisLabelWidth: 40,
  expectedLabelWidth: 58,
  expectedLabelHeight: 18,
  labelsMinDistance: 20,
}

const Container = styled.div`
  position: relative;
`

const ChartWrapper = styled.div`
  ${takeWholeSpaceAbsolutely};
`

const XAxisContainer = styled.div`
  width: 100%;
  position: relative;
`

const InfoContainer = styled(VStack)`
  font-size: 14px;
`

export const CurrentWeekVsBudget = () => {
  const { allocation } = useWeekTimeAllocation()

  const weekday = useWeekday()
  const sets = useCurrentWeekSets()
  const weekStartedAt = useStartOfWeek()

  const { colors } = useTheme()
  const budgetColor = colors.alert

  const budgetTimeSeries = useMemo(() => {
    return allocation.reduce((acc, value) => {
      const previous = acc[acc.length - 1] || 0
      return [...acc, previous + value]
    }, [] as number[])
  }, [allocation])

  const realTimeSeries = useMemo(() => {
    return range(weekday + 1).reduce((acc, day) => {
      const previous = acc[acc.length - 1] || 0
      const value = convertDuration(
        getSetsSum(
          getDaySets(sets, weekStartedAt + convertDuration(day, 'd', 'ms')),
        ),
        'ms',
        'min',
      )
      return [...acc, previous + value]
    }, [] as number[])
  }, [sets, weekday, weekStartedAt])

  const [selectedDataPoint, setSelectedDataPoint] = useState<number>(
    D_IN_WEEK - 1,
  )
  const [isSelectedDataPointVisible, setIsSelectedDataPointVisible] =
    useState<boolean>(false)

  return (
    <Panel kind="secondary">
      <VStack gap={20}>
        <SectionTitle>
          Current week{' '}
          <Text as="span" color="shy">
            vs
          </Text>{' '}
          <Text as="span" color="alert">
            Budget
          </Text>
        </SectionTitle>
        <HStack>
          <ElementSizeAware
            render={({ setElement, size }) => {
              const budgetTotal = getLastItem(budgetTimeSeries)
              const yMax = Math.max(
                getLastItem(budgetTimeSeries),
                getLastItem(realTimeSeries),
              )

              const yMin = Math.min(...budgetTimeSeries, ...realTimeSeries)

              const normalizeData = (data: number[]) =>
                normalize([...data, yMin, yMax]).slice(0, -2)

              const yLabels = [budgetTimeSeries[0], budgetTotal]
              const yLabelsData = normalizeData(yLabels)

              const normalizedBudgetTimeSeries = normalizeData(budgetTimeSeries)
              const normalizedRealTimeSeries = normalizeData(realTimeSeries)

              const renderContent = (size: ElementSize) => {
                const lineChartWidth =
                  size.width - lineChartConfig.expectedYAxisLabelWidth

                return (
                  <VStack gap={12}>
                    <HStack>
                      <Spacer width={lineChartConfig.expectedYAxisLabelWidth} />
                      <LineChartItemInfo
                        itemIndex={selectedDataPoint}
                        isVisible={isSelectedDataPointVisible}
                        containerWidth={
                          size.width - lineChartConfig.expectedYAxisLabelWidth
                        }
                        data={normalizedBudgetTimeSeries}
                      >
                        <InfoContainer gap={4}>
                          <LabeledValue name="Done">
                            <Text color="contrast">
                              {realTimeSeries[selectedDataPoint] ? (
                                <EmphasizeNumbers
                                  value={formatDuration(
                                    realTimeSeries[selectedDataPoint],
                                    'min',
                                    {
                                      maxUnit: 'h',
                                    },
                                  )}
                                />
                              ) : (
                                '-'
                              )}
                            </Text>
                          </LabeledValue>
                          <LabeledValue name="Expected">
                            <Text color="contrast">
                              <EmphasizeNumbers
                                value={formatDuration(
                                  budgetTimeSeries[selectedDataPoint],
                                  'min',
                                  {
                                    maxUnit: 'h',
                                  },
                                )}
                              />
                            </Text>
                          </LabeledValue>
                        </InfoContainer>
                      </LineChartItemInfo>
                    </HStack>

                    <HStack>
                      <ChartYAxis
                        expectedLabelWidth={
                          lineChartConfig.expectedYAxisLabelWidth
                        }
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
                        gap={4}
                      >
                        <ChartHorizontalGridLines data={yLabelsData} />
                        <Container>
                          <ChartWrapper>
                            <LineChart
                              dataPointsConnectionKind="sharp"
                              fillKind="none"
                              data={normalizedBudgetTimeSeries}
                              width={lineChartWidth}
                              height={lineChartConfig.chartHeight}
                              color={budgetColor}
                            />
                          </ChartWrapper>
                          <ChartWrapper>
                            <LineChart
                              dataPointsConnectionKind="sharp"
                              fillKind="none"
                              data={normalizedRealTimeSeries}
                              width={
                                lineChartWidth *
                                ((normalizedRealTimeSeries.length - 1) /
                                  (normalizedBudgetTimeSeries.length - 1))
                              }
                              height={lineChartConfig.chartHeight}
                              color={colors.contrast}
                            />
                          </ChartWrapper>
                        </Container>
                        <LineChartPositionTracker
                          data={normalizedBudgetTimeSeries}
                          color={colors.mist}
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

                      <XAxisContainer
                        style={{
                          minHeight: lineChartConfig.expectedLabelHeight,
                        }}
                      >
                        {range(D_IN_WEEK).map((index) => {
                          const isSelected =
                            isSelectedDataPointVisible &&
                            index === selectedDataPoint
                          return (
                            <PositionAbsolutelyCenterVertically
                              left={toPercents(index / (D_IN_WEEK - 1))}
                            >
                              <Text
                                color={isSelected ? 'contrast' : 'shy'}
                                size={12}
                              >
                                {getShortWeekday(index)}
                              </Text>
                            </PositionAbsolutelyCenterVertically>
                          )
                        })}
                      </XAxisContainer>
                    </HStack>
                  </VStack>
                )
              }

              return (
                <VStack fullWidth gap={20} ref={setElement}>
                  {size && renderContent(size)}
                </VStack>
              )
            }}
          />
          <Spacer width={lineChartConfig.expectedYAxisLabelWidth} />
        </HStack>
      </VStack>
    </Panel>
  )
}
