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
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { toPercents } from '@lib/utils/toPercents'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { YLabelHighlight } from '../../chart/YLabelHighlight'
import { ChartHighlightLine } from '../../chart/ChartHighlightLine'

const Line = styled(ChartHighlightLine)`
  color: ${getColor('alert')};
`

const BudgetOutline = styled.div`
  ${absoluteOutline(8, 4)};
  ${borderRadius.s};
  background: ${getColor('background')};
  border: 2px solid ${getColor('alert')};
  z-index: -1;
`

export const SessionsChart = () => {
  const days = useSetsGroupedByDays()

  const { finishWorkAt } = useUser()

  const min = useMemo(() => {
    const earliestStart = Math.min(...days.flat().flatMap(({ start }) => start))

    return convertDuration(
      Math.floor(earliestStart / convertDuration(1, 'h', 'min')),
      'h',
      'min',
    )
  }, [days])

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
    workdayEnd: [finishWorkAt - min],
  })

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        return (
          <VStack fullWidth gap={20} ref={setElement}>
            {size && (
              <>
                <ChartContainer>
                  {normalized.workdayEnd.map((boundary, index) => {
                    console.log({ index, boundary })
                    return (
                      <PositionAbsolutelyCenterHorizontally
                        key={index}
                        top={toPercents(boundary)}
                        fullWidth
                      >
                        <Line />
                      </PositionAbsolutelyCenterHorizontally>
                    )
                  })}
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
                  {normalized.workdayEnd.map((boundary, index) => {
                    console.log({ index, boundary })
                    return (
                      <PositionAbsolutelyCenterHorizontally
                        key={index}
                        top={toPercents(boundary)}
                      >
                        <YLabelHighlight>
                          {formatDailyEventTime(finishWorkAt)}
                          <BudgetOutline />
                        </YLabelHighlight>
                      </PositionAbsolutelyCenterHorizontally>
                    )
                  })}
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
