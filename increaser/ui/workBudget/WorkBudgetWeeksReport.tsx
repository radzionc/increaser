import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useMemo } from 'react'

import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'

import { useTheme } from 'styled-components'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import {
  fromWeek,
  stringToWeek,
  toWeek,
  weekToString,
} from '@lib/utils/time/Week'
import { order } from '@lib/utils/array/order'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { BarChart } from '@lib/ui/charts/BarChart'
import { useUser } from '@increaser/ui/user/state/user'

const maxWeeks = 4
const minWeeks = 2

export const WorkBudgetWeeksReport = () => {
  const weekStartedAt = useStartOfWeek()

  const { weeks } = useUser()

  const lastWeekStartedAt = weekStartedAt - convertDuration(1, 'w', 'ms')

  const firstWeekStartedAt = useMemo(() => {
    const allWeeks = Object.keys(weeks).map(stringToWeek).map(fromWeek)
    if (!allWeeks.length) return lastWeekStartedAt

    return Math.max(
      lastWeekStartedAt - convertDuration(maxWeeks - 1, 'w', 'ms'),
      order(allWeeks, (v) => v, 'asc')[0],
    )
  }, [lastWeekStartedAt, weeks])

  const weeksNumber =
    Math.round(lastWeekStartedAt - firstWeekStartedAt) /
      convertDuration(1, 'w', 'ms') +
    1

  const totals = useMemo(() => {
    return range(weeksNumber).map((index) => {
      const weekStartedAt =
        firstWeekStartedAt + convertDuration(index, 'w', 'ms')
      const weekString = weekToString(toWeek(weekStartedAt))
      const timeRecord = weeks[weekString] || {}
      return sum(Object.values(timeRecord))
    })
  }, [firstWeekStartedAt, weeks, weeksNumber])

  const theme = useTheme()

  if (weeksNumber < minWeeks) {
    return (
      <div>
        <ShyInfoBlock>
          After {minWeeks} weeks of using the app, you'll access a report that
          shows your average work week.
        </ShyInfoBlock>
      </div>
    )
  }

  return (
    <VStack gap={20}>
      <Text color="contrast" weight="500">
        Last {weeksNumber} weeks report
      </Text>
      <UniformColumnGrid gap={20}>
        <LabeledValue labelColor="supporting" name={`Avg. week`}>
          <Text as="span" color="contrast">
            {formatDuration(sum(totals) / weeksNumber, 's', { maxUnit: 'h' })}
          </Text>
        </LabeledValue>
      </UniformColumnGrid>
      <BarChart
        height={120}
        items={totals.map((value, index) => {
          const weekStartedAt =
            firstWeekStartedAt + index * convertDuration(1, 'w', 'ms')
          return {
            value,
            label: <Text>week #{toWeek(weekStartedAt).week + 1}</Text>,
            color: theme.colors.mist,

            renderValue:
              value > 0
                ? () => (
                    <Text>{formatDuration(value, 's', { maxUnit: 'h' })}</Text>
                  )
                : undefined,
          }
        })}
      />
    </VStack>
  )
}
