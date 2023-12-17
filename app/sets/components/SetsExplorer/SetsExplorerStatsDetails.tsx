import { SetsExplorerDay } from './SetsExplorerProvider'
import { useMemo } from 'react'
import { getBlocks } from 'sets/Block'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { getAverage } from '@increaser/utils/math/getAverage'
import { SetsExplorerStatistic } from './SetsExplorerStatistic'
import { getWeekday } from '@increaser/utils/time/getWeekday'
import { formatDailyEventTime } from '@increaser/utils/time/formatDailyEventTime'

interface SetsExplorerStatsDetailsProps {
  days: SetsExplorerDay[]
}

export const SetsExplorerStatsDetails = ({
  days,
}: SetsExplorerStatsDetailsProps) => {
  const sets = useMemo(() => days.flatMap((day) => day.sets), [days])
  const daysWithSets = useMemo(
    () => days.filter((day) => day.sets.length),
    [days],
  )

  const avgBlock = useMemo(() => {
    if (!sets.length) return

    const blocks = getBlocks(sets)
    const total = getSetsSum(sets)
    return total / blocks.length
  }, [sets])

  const avgWorkdayStart = useMemo(() => {
    if (!daysWithSets.length) return

    const ms = getAverage(
      daysWithSets.map((day) => day.sets[0].start - day.startedAt),
    )

    return formatDailyEventTime(convertDuration(ms, 'ms', 'min'))
  }, [daysWithSets])

  const avgWorkdayEnd = useMemo(() => {
    if (!daysWithSets.length) return

    const ms = getAverage(
      daysWithSets.map(
        (day) => day.sets[day.sets.length - 1].end - day.startedAt,
      ),
    )

    return formatDailyEventTime(convertDuration(ms, 'ms', 'min'))
  }, [daysWithSets])

  const avgWorkday = useMemo(() => {
    const workdays = daysWithSets.filter(
      (day) => getWeekday(new Date(day.startedAt)) < 5,
    )
    if (!workdays.length) return

    const sets = workdays.flatMap((day) => day.sets)

    return getSetsSum(sets) / workdays.length
  }, [daysWithSets])

  const avgWeekend = useMemo(() => {
    const weekends = daysWithSets.filter(
      (day) => getWeekday(new Date(day.startedAt)) >= 5,
    )
    if (!weekends.length) return

    const sets = weekends.flatMap((day) => day.sets)

    return getSetsSum(sets) / weekends.length
  }, [daysWithSets])

  return (
    <>
      <SetsExplorerStatistic
        title="Start work"
        value={avgWorkdayStart ? avgWorkdayStart : '-'}
      />
      <SetsExplorerStatistic
        title="Finish work"
        value={avgWorkdayEnd ? avgWorkdayEnd : '-'}
      />
      <SetsExplorerStatistic
        title="Block"
        value={avgBlock ? formatDuration(avgBlock, 'ms') : '-'}
      />
      <SetsExplorerStatistic
        title="Workday total"
        value={avgWorkday ? formatDuration(avgWorkday, 'ms') : '-'}
      />
      <SetsExplorerStatistic
        title="Weekend total"
        value={avgWeekend ? formatDuration(avgWeekend, 'ms') : '-'}
      />
    </>
  )
}
