import { VStack } from '@lib/ui/css/stack'
import { useMemo } from 'react'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { trackedTimeChartConfig } from '../../chart/config'
import { ChartContent } from '../../chart/ChartContent'
import { DataPointSelector } from '../../chart/DataPointSelector'
import { ChartXLabels } from '../../chart/ChartXLabels'
import { ChartContainer } from '../../chart/ChartContainer'
import { useSetsGroupedByDays } from '../state/setsGroupedByDays'
import { useUser } from '../../../../user/state/user'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { fillRangeWithPoints } from '@lib/ui/charts/utils/fillRangeWithPoints'
import { YLabel } from '../../chart/YLabel'
import { DaySessions } from './DaySessions'

export const SessionsChart = () => {
  const days = useSetsGroupedByDays()

  const { startWorkAt, finishWorkAt } = useUser()

  const min = useMemo(() => {
    const earliestStart = Math.min(
      ...days.flat().flatMap(({ start }) => start),
      startWorkAt,
    )

    return convertDuration(
      Math.floor(earliestStart / convertDuration(1, 'h', 'min')),
      'h',
      'min',
    )
  }, [days, startWorkAt])

  const max = useMemo(() => {
    const latestEnd = Math.max(
      ...days.flat().flatMap(({ end }) => end),
      finishWorkAt,
    )

    return convertDuration(
      Math.ceil(latestEnd / convertDuration(1, 'h', 'min')),
      'h',
      'min',
    )
  }, [days, finishWorkAt])

  const duration = max - min

  const yLabels = useMemo(
    () =>
      fillRangeWithPoints({
        length: duration,
        steps: [30, 60, 120, 180, 240, 320],
        maxPoints: 12,
      }),
    [duration],
  )

  const normalized = normalizeDataArrays({
    yLabels,
  })

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        return (
          <VStack fullWidth gap={20} ref={setElement}>
            {size && (
              <>
                <ChartContainer>
                  <ChartYAxis
                    expectedLabelWidth={
                      trackedTimeChartConfig.expectedYLabelWidth
                    }
                    renderLabel={(index) => {
                      const minutes = max - yLabels[index]

                      return (
                        <YLabel key={index}>
                          {formatDailyEventTime(minutes)}
                        </YLabel>
                      )
                    }}
                    data={normalized.yLabels}
                  />
                  <VStack
                    style={{
                      position: 'relative',
                      minHeight: trackedTimeChartConfig.chartHeight,
                    }}
                    fullWidth
                  >
                    <ChartHorizontalGridLines data={normalized.yLabels} />
                    <ChartContent>
                      {days.map((sets, index) => (
                        <DaySessions
                          key={index}
                          sets={sets}
                          index={index}
                          interval={{ start: min, end: max }}
                        />
                      ))}
                    </ChartContent>
                    <DataPointSelector />
                  </VStack>
                </ChartContainer>

                <ChartXLabels width={size.width} />
              </>
            )}
          </VStack>
        )
      }}
    />
  )
}
