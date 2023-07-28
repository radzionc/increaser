import { startOfMonth, subMonths } from 'date-fns'
import { useMemo, useState } from 'react'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { useCurrentMonthSets } from 'sets/hooks/useCurrentMonthSets'
import { useCurrentWeekSets } from 'sets/hooks/useCurrentWeekSets'
import { useStartOfWeek } from 'shared/hooks/useStartOfWeek'
import { useWeekday } from 'shared/hooks/useWeekday'
import { areSameMonth } from 'shared/utils/areSameMonth'
import { areSameWeek } from 'shared/utils/areSameWeek'
import { formatDuration } from 'shared/utils/formatDuration'
import { range } from 'shared/utils/range'
import { sum } from 'shared/utils/sum'
import { toMonth } from 'shared/utils/toMonth'
import { toWeek } from 'shared/utils/toWeek'
import { useTheme } from 'styled-components'
import { BarChart } from '@increaser/ui/ui/BarChart'
import { LabeledValue } from '@increaser/ui/ui/LabeledValue'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { TabNavigation } from '@increaser/ui/ui/TabNavigation'
import { Text } from '@increaser/ui/ui/Text'
import { shortMonthsNames } from 'utils/months'
import {
  D_IN_WEEK,
  MS_IN_DAY,
  MS_IN_SEC,
  MS_IN_WEEK,
  S_IN_MIN,
  getShortWeekday,
} from 'utils/time'

import { useCurrentProject } from './CurrentProjectProvider'

const projectStatsView = ['days', 'weeks', 'months'] as const
type ProjectStatsView = (typeof projectStatsView)[number]

const projectStatsViewName: Record<ProjectStatsView, string> = {
  days: 'Days',
  weeks: 'Weeks',
  months: 'Months',
}

interface StatsViewDataPoint {
  value: number
  label: string
  isCurrent?: boolean
}

const monthsToDisplay = 4
const weeksToDisplay = 4

export const ProjectStats = () => {
  const [view, setView] = useState<ProjectStatsView>('weeks')

  const {
    id,
    hslaColor,
    weeks: partialWeeks,
    doneMinutesThisWeek,
    months: partialMonths,
  } = useCurrentProject()

  const weekStartedAt = useStartOfWeek()
  const currentWeekday = useWeekday()

  const { colors } = useTheme()

  const currentWeekSets = useCurrentWeekSets().filter(
    (set) => set.projectId === id,
  )
  const currentMonthSets = useCurrentMonthSets().filter(
    (set) => set.projectId === id,
  )

  const data: StatsViewDataPoint[] = useMemo(() => {
    let result: StatsViewDataPoint[] = []

    if (view === 'days') {
      result = range(D_IN_WEEK).map((index) => {
        const dayStartsAt = weekStartedAt + MS_IN_DAY * index
        const dayEndsAt = dayStartsAt + MS_IN_DAY
        const value =
          getSetsSum(
            currentWeekSets.filter(
              (set) => set.end < dayEndsAt && set.start > dayStartsAt,
            ),
          ) / MS_IN_SEC

        return {
          isCurrent: index === currentWeekday,
          value,
          label: getShortWeekday(index),
        }
      })
    } else if (view === 'weeks') {
      result = range(weeksToDisplay)
        .map((index) => {
          const week = toWeek(
            weekStartedAt - (weeksToDisplay - index) * MS_IN_WEEK,
          )
          return (
            partialWeeks.find((partialWeek) =>
              areSameWeek(partialWeek, week),
            ) || {
              ...week,
              seconds: 0,
            }
          )
        })
        .map(({ seconds, week }) => ({
          label: `Week #${week}`,
          value: seconds,
        }))

      result.push({
        isCurrent: true,
        label: 'This week',
        value: doneMinutesThisWeek * S_IN_MIN,
      })

      return result
    } else {
      const currentMonth = startOfMonth(new Date())

      result = range(monthsToDisplay)
        .reverse()
        .map((index) => {
          const monthDate = subMonths(currentMonth, index + 1)
          const month = toMonth(monthDate.getTime())

          return (
            partialMonths.find((partialMonth) =>
              areSameMonth(partialMonth, month),
            ) || {
              ...month,
              seconds: 0,
            }
          )
        })
        .map(({ seconds, month }) => ({
          label: shortMonthsNames[month - 1],
          value: seconds,
        }))

      const doneThisMonth = getSetsSum(currentMonthSets)

      result.push({
        isCurrent: true,
        label: shortMonthsNames[toMonth(currentMonth.getTime()).month - 1],
        value: doneThisMonth / MS_IN_SEC,
      })
    }

    return result
  }, [
    currentMonthSets,
    currentWeekSets,
    currentWeekday,
    doneMinutesThisWeek,
    partialMonths,
    partialWeeks,
    view,
    weekStartedAt,
  ])

  const previousAvg = useMemo(() => {
    const applicableItems = data.filter((data) => data.value).slice(0, -1)
    if (!applicableItems.length) return '-'

    return formatDuration(
      sum(applicableItems.map((data) => data.value)) / applicableItems.length,
      's',
    )
  }, [data])

  return (
    <VStack gap={28}>
      <HStack
        justifyContent="space-between"
        fullWidth
        alignItems="center"
        gap={16}
        wrap="wrap"
      >
        <TabNavigation<ProjectStatsView>
          views={projectStatsView}
          getViewName={(v) => projectStatsViewName[v]}
          activeView={view}
          onSelect={setView}
          groupName="stats"
          size="s"
        />
        <LabeledValue name="Previous avg">
          <Text weight="semibold" as="div">
            {previousAvg}
          </Text>
        </LabeledValue>
      </HStack>

      <BarChart
        height={160}
        items={data.map(({ value, label, isCurrent }) => {
          return {
            value,
            label: (
              <Text color={isCurrent ? 'contrast' : undefined}>{label}</Text>
            ),
            color: isCurrent ? hslaColor : colors.mist,

            renderValue:
              value > 0
                ? () => (
                    <Text color={isCurrent ? 'contrast' : undefined}>
                      {formatDuration(value, 's')}
                    </Text>
                  )
                : undefined,
          }
        })}
      />
    </VStack>
  )
}
