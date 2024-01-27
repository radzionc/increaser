import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { useSetsExplorer } from './SetsExplorerProvider'
import { useTheme } from 'styled-components'
import { match } from '@lib/utils/match'
import { useState } from 'react'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getSetsSum } from '../../helpers/getSetsSum'
import { normalize } from '@lib/utils/math/normalize'
import { getBlocks } from '@increaser/entities-utils/block'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { dataVerticalPadding } from '@lib/ui/charts/utils/dataVerticalPadding'
import { LineChartItemInfo } from '@lib/ui/charts/LineChart/LineChartItemInfo'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { Match } from '@lib/ui/base/Match'
import { format } from 'date-fns'
import { formatTime } from '@lib/utils/time/formatTime'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { LineChart } from '@lib/ui/charts/LineChart'
import { LineChartPositionTracker } from '@lib/ui/charts/LineChart/LineChartPositionTracker'
import { ChartXAxis } from '@lib/ui/charts/ChartXAxis'

const chartConfig = {
  chartHeight: 120,
  expectedLabelWidth: 58,
  expectedLabelHeight: 18,
  labelsMinDistance: 20,
}

export const SetsChart = () => {
  const { currentStatistic, days } = useSetsExplorer()

  const [selectedDay, setSelectedDay] = useState<number>(days.length - 1)
  const [isSelectedDayVisible, setIsSelectedDayVisible] =
    useState<boolean>(false)

  const { colors } = useTheme()
  const color = colors.primary

  if (days.length < 2) return null

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const data = dataVerticalPadding(
          normalize(
            match(currentStatistic, {
              startedWorkAt: () =>
                days.map((day) =>
                  isEmpty(day.sets)
                    ? 0
                    : convertDuration(1, 'd', 'ms') -
                      (day.sets[0].start - day.startedAt),
                ),
              finishedWorkAt: () =>
                days.map((day) =>
                  isEmpty(day.sets)
                    ? 0
                    : convertDuration(1, 'd', 'ms') -
                      (day.sets[day.sets.length - 1].end - day.startedAt),
                ),
              block: () =>
                days.map((day) =>
                  isEmpty(day.sets)
                    ? 0
                    : getSetsSum(day.sets) / getBlocks(day.sets).length,
                ),
              total: () => days.map((day) => getSetsSum(day.sets)),
            }),
          ),
          {
            top: 0.2,
            bottom: 0.2,
          },
        )

        return (
          <VStack fullWidth gap={4} ref={setElement}>
            {size && (
              <>
                <LineChartItemInfo
                  itemIndex={selectedDay}
                  isVisible={isSelectedDayVisible}
                  containerWidth={size.width}
                  data={data}
                  render={(index) => {
                    const day = days[index]
                    return (
                      <VStack>
                        <Text color="contrast" weight="semibold">
                          <Match
                            value={currentStatistic}
                            startedWorkAt={() =>
                              isEmpty(day.sets)
                                ? '-'
                                : formatTime(day.sets[0].start)
                            }
                            finishedWorkAt={() =>
                              isEmpty(day.sets)
                                ? '-'
                                : formatTime(getLastItem(day.sets).end)
                            }
                            block={() =>
                              isEmpty(day.sets)
                                ? '-'
                                : formatDuration(
                                    getSetsDuration(day.sets) /
                                      getBlocks(day.sets).length,
                                    'ms',
                                  )
                            }
                            total={() =>
                              formatDuration(getSetsSum(day.sets), 'ms')
                            }
                          />
                        </Text>
                        <Text color="supporting" size={14} weight="semibold">
                          {format(day.startedAt, 'EEE d, MMM yyyy')}
                        </Text>
                      </VStack>
                    )
                  }}
                />
                <VStack style={{ position: 'relative' }}>
                  <LineChart
                    width={size.width}
                    height={chartConfig.chartHeight}
                    data={data}
                    color={color}
                  />
                  <LineChartPositionTracker
                    data={data}
                    color={color}
                    onChange={(index) => {
                      if (index === null) {
                        setIsSelectedDayVisible(false)
                      } else {
                        setIsSelectedDayVisible(true)
                        setSelectedDay(index)
                      }
                    }}
                  />
                </VStack>
                <ChartXAxis
                  data={data}
                  expectedLabelWidth={chartConfig.expectedLabelWidth}
                  labelsMinDistance={chartConfig.labelsMinDistance}
                  containerWidth={size.width}
                  expectedLabelHeight={chartConfig.expectedLabelHeight}
                  renderLabel={(index) => (
                    <Text size={12} color="supporting" nowrap>
                      {format(days[index].startedAt, 'd MMM')}
                    </Text>
                  )}
                />
              </>
            )}
          </VStack>
        )
      }}
    />
  )
}
