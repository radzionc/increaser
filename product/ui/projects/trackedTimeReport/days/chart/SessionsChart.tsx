import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { ChartHorizontalGridLines } from '@lib/ui/charts/ChartHorizontalGridLines'
import { ChartYAxis } from '@lib/ui/charts/ChartYAxis'
import { fillRangeWithPoints } from '@lib/ui/charts/utils/fillRangeWithPoints'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { VStack } from '@lib/ui/css/stack'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { getColor } from '@lib/ui/theme/getters'
import { normalizeDataArrays } from '@lib/utils/math/normalizeDataArrays'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { toPercents } from '@lib/utils/toPercents'
import { useMemo } from 'react'
import styled from 'styled-components'

import { useUser } from '../../../../user/state/user'
import { ChartContainer } from '../../chart/ChartContainer'
import { ChartContent } from '../../chart/ChartContent'
import { ChartHighlightLine } from '../../chart/ChartHighlightLine'
import { ChartXLabels } from '../../chart/ChartXLabels'
import { trackedTimeChartConfig } from '../../chart/config'
import { DataPointSelector } from '../../chart/DataPointSelector'
import { YLabel } from '../../chart/YLabel'
import { YLabelHighlight } from '../../chart/YLabelHighlight'
import { useSetsGroupedByDays } from '../state/setsGroupedByDays'

import { DaySessions } from './DaySessions'

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
                    style={{
                      minWidth: trackedTimeChartConfig.expectedYLabelWidth,
                    }}
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
