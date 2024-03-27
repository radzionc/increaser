import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useMemo } from 'react'

import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'

import { useTheme } from 'styled-components'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { fromWeek, toWeek } from '@lib/utils/time/Week'
import { order } from '@lib/utils/array/order'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { BarChart } from '@lib/ui/charts/BarChart'

const maxWeeks = 4
const minWeeks = 2

export const WorkBudgetWeeksReport = () => {
  const weekStartedAt = useStartOfWeek()

  const { projects } = useProjects()

  const lastWeekStartedAt = weekStartedAt - convertDuration(1, 'w', 'ms')

  const firstWeekStartedAt = useMemo(() => {
    const allWeeks = projects.flatMap((project) => project.weeks).map(fromWeek)
    if (!allWeeks.length) return lastWeekStartedAt

    return Math.max(
      lastWeekStartedAt - convertDuration(maxWeeks, 'w', 'ms'),
      order(allWeeks, (v) => v, 'asc')[0],
    )
  }, [lastWeekStartedAt, projects])

  const weeks =
    Math.round(lastWeekStartedAt - firstWeekStartedAt) /
    convertDuration(1, 'w', 'ms')

  const totals = useMemo(() => {
    const result = range(weeks).map(() => 0)

    projects
      .flatMap((project) => project.weeks)
      .forEach(({ week, year, seconds }) => {
        const weekStartedAt = fromWeek({ week, year })
        const weekIndex = Math.round(
          (weekStartedAt - firstWeekStartedAt) / convertDuration(1, 'w', 'ms'),
        )

        if (weekIndex < 0 || weekIndex >= weeks) return

        result[weekIndex] += seconds
      })

    return result
  }, [firstWeekStartedAt, projects, weeks])

  const theme = useTheme()

  if (weeks < minWeeks) {
    return (
      <ShyInfoBlock>
        After {minWeeks} weeks of using the app, you'll access a report that
        shows your average work week.
      </ShyInfoBlock>
    )
  }

  return (
    <VStack gap={20}>
      <Text color="contrast" weight="semibold">
        Last {weeks} weeks report
      </Text>
      <UniformColumnGrid gap={20}>
        <LabeledValue labelColor="supporting" name={`Avg. week`}>
          <Text as="span" color="contrast">
            {formatDuration(sum(totals) / weeks, 's', { maxUnit: 'h' })}
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
