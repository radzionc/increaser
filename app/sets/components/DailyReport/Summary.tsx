import { getBlockColor, getBlocks } from 'sets/Block'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { useGroupedByDayCurrentWeekSets } from 'sets/hooks/useGroupedByDayCurrentWeekSets'
import { useWeekday } from '@increaser/ui/hooks/useWeekday'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { formatTime } from '@increaser/utils/time/formatTime'
import { match } from '@increaser/utils/match'
import styled, { useTheme } from 'styled-components'
import { BarChart } from '@increaser/ui/charts/BarChart'
import { Text } from '@increaser/ui/text'
import { toSizeUnit } from '@increaser/ui/css/toSizeUnit'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MS_IN_MIN } from '@increaser/utils/time'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'

import { SummaryRow } from './SummaryRow'
import { getLastItem } from '@increaser/utils/array/getLastItem'

const Container = styled.div<{ labelsWidth: number }>`
  display: grid;
  grid-template-columns: ${({ labelsWidth }) => toSizeUnit(labelsWidth)} repeat(
      7,
      1fr
    );
  align-items: end;
  font-size: 14px;
  gap: 12px 4px;
`

interface SummaryProps {
  labelsWidth: number
}

export const Summary = ({ labelsWidth }: SummaryProps) => {
  const days = useGroupedByDayCurrentWeekSets()
  const { allocation } = useWeekTimeAllocation()
  const { goalToStartWorkAt, goalToFinishWorkBy, primaryGoal } =
    useAssertUserState()

  const theme = useTheme()

  const currentWeekday = useWeekday()

  return (
    <Container labelsWidth={labelsWidth}>
      <>
        <Text color="shy">Total:</Text>
        <div style={{ gridColumn: 'span 7' }}>
          <BarChart
            height={80}
            items={days.map(({ sets }, weekday) => ({
              value: getSetsSum(sets),
              color: theme.colors.mist,
              renderValue:
                weekday <= currentWeekday
                  ? () => {
                      const expected = allocation[weekday] * MS_IN_MIN
                      const actual = getSetsSum(sets)
                      return (
                        <Text
                          color={match(primaryGoal, {
                            workMore: () =>
                              expected >= actual ? 'alert' : 'success',
                            workLess: () =>
                              expected >= actual ? 'success' : 'alert',
                            awareness: () => 'regular',
                          })}
                        >
                          {formatDuration(getSetsSum(sets), 'ms')}
                        </Text>
                      )
                    }
                  : undefined,
            }))}
          />
        </div>
      </>
      <SummaryRow
        name="Started at"
        days={days}
        renderDayStatistic={({ sets, startsAt }) => {
          const shouldStartAt = startsAt + goalToStartWorkAt * MS_IN_MIN
          const startedAt = sets[0].start

          return (
            <Text color={startedAt <= shouldStartAt ? 'success' : 'regular'}>
              {formatTime(startedAt)}
            </Text>
          )
        }}
      />

      <SummaryRow
        name="Finished at"
        days={days}
        renderDayStatistic={({ sets, startsAt }) => {
          const finishedAt = getLastItem(sets).end
          const shouldFinishAt = startsAt + goalToFinishWorkBy * MS_IN_MIN

          return (
            <Text color={finishedAt <= shouldFinishAt ? 'success' : 'alert'}>
              {formatTime(finishedAt)}
            </Text>
          )
        }}
      />

      <SummaryRow
        name="Avg. block"
        days={days}
        renderDayStatistic={({ sets }) => {
          const avgInMin = getSetsSum(sets) / getBlocks(sets).length / MS_IN_MIN

          return (
            <Text
              style={{
                color: getBlockColor(
                  getSetsSum(sets) / getBlocks(sets).length,
                  theme,
                ),
              }}
            >
              {formatDuration(avgInMin, 'min')}
            </Text>
          )
        }}
      />
    </Container>
  )
}
