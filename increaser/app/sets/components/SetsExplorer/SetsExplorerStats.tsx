import { HStack, VStack } from '@lib/ui/layout/Stack'
import { SetsExplorerDay, useSetsExplorer } from './SetsExplorerProvider'
import { Text } from '@lib/ui/text'
import { pluralize } from '@lib/utils/pluralize'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { MinimalisticToggle } from '@lib/ui/inputs/MinimalisticToggle'
import { useMemo } from 'react'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getAverage } from '@lib/utils/math/getAverage'
import { formatDailyEventTime } from '@lib/utils/time/formatDailyEventTime'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { getSetsSum } from '@increaser/app/sets/helpers/getSetsSum'
import { getBlocks } from '@increaser/app/sets/Block'
import { isWorkday } from '@lib/utils/time/isWorkday'
import { Statistic } from '@lib/ui/layout/Statistic'
import { Panel } from '@lib/ui/panel/Panel'

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

const getFormattedAvgDay = (days: SetsExplorerDay[]) => {
  const sets = days.flatMap((day) => day.sets)

  return formatDuration(getSetsSum(sets) / days.length, 'ms')
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
      <UniformColumnGrid gap={16} maxColumns={5} minChildrenWidth={120}>
        <Panel>
          <Statistic
            title="Start work"
            value={
              isEmpty(daysWithSets)
                ? undefined
                : getFormattedAvgWorkdayStart(daysWithSets)
            }
          />
        </Panel>
        <Panel>
          <Statistic
            title="End work"
            value={
              isEmpty(daysWithSets)
                ? undefined
                : getFormattedAvgWorkdayEnd(daysWithSets)
            }
          />
        </Panel>

        <Panel>
          <Statistic
            title="Block"
            value={
              isEmpty(daysWithSets)
                ? undefined
                : getFormattedAvgBlock(daysWithSets)
            }
          />
        </Panel>
        <Panel style={{ gridColumn: 'span 2' }}>
          <UniformColumnGrid gap={16} maxColumns={6} minChildrenWidth={80}>
            <Statistic
              title="Avg. Day"
              value={
                isEmpty(daysWithSets)
                  ? undefined
                  : getFormattedAvgDay(daysWithSets)
              }
            />
            <Text color="supporting" as="div">
              <Statistic
                title="Workday"
                value={
                  isEmpty(daysWithSets)
                    ? undefined
                    : getFormattedAvgWorkday(daysWithSets)
                }
              />
            </Text>
            <Text color="supporting" as="div">
              <Statistic
                title="Weekend"
                value={
                  isEmpty(daysWithSets)
                    ? undefined
                    : getFormattedAvgWeekend(daysWithSets)
                }
              />
            </Text>
          </UniformColumnGrid>
        </Panel>
      </UniformColumnGrid>
    </VStack>
  )
}
