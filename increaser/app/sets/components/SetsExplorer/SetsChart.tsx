import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { useSetsExplorer } from './SetsExplorerProvider'
import styled, { useTheme } from 'styled-components'
import { match } from '@lib/utils/match'
import { useMemo, useState } from 'react'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getSetsSum } from '../../helpers/getSetsSum'
import { normalize } from '@lib/utils/math/normalize'
import { getBlocks } from '@increaser/entities-utils/block'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { addTopPadding } from '@lib/ui/charts/utils/addTopPadding'
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

const Container = styled(VStack)`
  gap: 4px;
  position: relative;
`

const chartHeight = 120
const itemInfoHeight = 24

export const SetsChart = () => {
  const { currentStatistic, days } = useSetsExplorer()

  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const daysWithSets = useMemo(
    () => days.filter((day) => !isEmpty(day.sets)),
    [days],
  )

  const { colors } = useTheme()
  const color = colors.primary

  if (isEmpty(daysWithSets)) return null

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const data = addTopPadding(
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
          0.2,
        )

        return (
          <Container ref={setElement}>
            {size && (
              <>
                <LineChartItemInfo
                  minHeight={itemInfoHeight}
                  containerWidth={size.width}
                  data={data}
                  itemIndex={selectedDay}
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
                <div style={{ position: 'relative' }}>
                  <LineChart
                    width={size.width}
                    height={chartHeight}
                    data={data}
                  />
                  <LineChartPositionTracker
                    data={data}
                    color={color}
                    onChange={setSelectedDay}
                  />
                </div>
              </>
            )}
          </Container>
        )
      }}
    />
  )
}
