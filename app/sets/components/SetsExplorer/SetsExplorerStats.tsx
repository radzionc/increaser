import { HStack, VStack } from '@increaser/ui/layout/Stack'
import { SetsExplorerDay, useSetsExplorer } from './SetsExplorerProvider'
import { Text } from '@increaser/ui/text'
import { pluralize } from '@increaser/utils/pluralize'
import { UniformColumnGrid } from '@increaser/ui/layout/UniformColumnGrid'
import { MinimalisticToggle } from '@increaser/ui/inputs/MinimalisticToggle'
import { useMemo } from 'react'
import { isEmpty } from '@increaser/utils/array/isEmpty'
import { getAverage } from '@increaser/utils/math/getAverage'
import { formatDailyEventTime } from '@increaser/utils/time/formatDailyEventTime'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { StatisticPanel } from '@increaser/ui/panel/StatisticPanel'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { getBlocks } from 'sets/Block'
import { isWorkday } from '@increaser/utils/time/isWorkday'

const getFormattedAvgWorkdayStart = (days: SetsExplorerDay[]) => {
  const ms = getAverage(days.map((day) => day.sets[0].start - day.startedAt))

  return formatDailyEventTime(convertDuration(ms, 'ms', 'min'))
}

const getFormattedAvgWorkdayEnd = (days: SetsExplorerDay[]) => {
  const ms = getAverage(
    days.map((day) => day.sets[day.sets.length - 1].end - day.startedAt),
  )

  return formatDailyEventTime(convertDuration(ms, 'ms', 'min'))
}

const getFormattedAvgBlock = (days: SetsExplorerDay[]) => {
  const sets = days.flatMap((day) => day.sets)
  const blocks = getBlocks(sets)
  const total = getSetsSum(sets)

  return formatDuration(total / blocks.length, 'ms')
}

const getFormattedAvgWorkday = (days: SetsExplorerDay[]) => {
  const workdays = days.filter((day) => isWorkday(day.startedAt))
  if (!workdays.length) return

  const sets = workdays.flatMap((day) => day.sets)

  return formatDuration(getSetsSum(sets) / workdays.length, 'ms')
}

const getFormattedAvgWeekend = (days: SetsExplorerDay[]) => {
  const weekends = days.filter((day) => !isWorkday(day.startedAt))
  if (!weekends.length) return

  const sets = weekends.flatMap((day) => day.sets)

  return formatDuration(getSetsSum(sets) / weekends.length, 'ms')
}

export const SetsExplorerStats = () => {
  const { days, includesToday, setIncludesToday } = useSetsExplorer()

  const daysWithSets = useMemo(
    () => days.filter((day) => !isEmpty(day.sets)),
    [days],
  )

  return (
    <VStack gap={16}>
      <HStack fullWidth alignItems="center" justifyContent="space-between">
        <Text weight="bold">
          {includesToday ? '' : 'Past '}
          {pluralize(days.length, 'day')} statistics
        </Text>
        <MinimalisticToggle
          value={includesToday}
          onChange={setIncludesToday}
          label="include today"
        />
      </HStack>
      <UniformColumnGrid gap={16} maxColumns={5} minChildrenWidth={160}>
        <StatisticPanel
          title="Start work"
          value={
            isEmpty(daysWithSets)
              ? undefined
              : getFormattedAvgWorkdayStart(daysWithSets)
          }
        />
        <StatisticPanel
          title="End work"
          value={
            isEmpty(daysWithSets)
              ? undefined
              : getFormattedAvgWorkdayEnd(daysWithSets)
          }
        />
        <StatisticPanel
          title="Block"
          value={
            isEmpty(daysWithSets)
              ? undefined
              : getFormattedAvgBlock(daysWithSets)
          }
        />
        <StatisticPanel
          title="Workday"
          value={
            isEmpty(daysWithSets)
              ? undefined
              : getFormattedAvgWorkday(daysWithSets)
          }
        />
        <StatisticPanel
          title="Weekend"
          value={
            isEmpty(daysWithSets)
              ? undefined
              : getFormattedAvgWeekend(daysWithSets)
          }
        />
      </UniformColumnGrid>
    </VStack>
  )
}
