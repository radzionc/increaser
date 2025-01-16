import { getSetsFinishedBefore } from '@increaser/entities-utils/set/getSetsFinishedBefore'
import { getSetsStartedAfter } from '@increaser/entities-utils/set/getSetsStartedAfter'
import { scoreboardPeriodInDays } from '@increaser/entities/PerformanceScoreboard'
import { maxMonths, User } from '@increaser/entities/User'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getMonthStartedAt } from '@lib/utils/time/getMonthStartedAt'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { trackTime } from './trackTime'
import {
  fromMonth,
  monthToString,
  stringToMonth,
  toMonth,
} from '@lib/utils/time/Month'
import { recordFilter } from '@lib/utils/record/recordFilter'
import { subMonths } from 'date-fns'

type UserFields = Pick<
  User,
  'sets' | 'timeZone' | 'months' | 'lastSyncedMonthEndedAt'
>

export const organizeMonths = ({
  timeZone,
  lastSyncedMonthEndedAt,
  sets,
  months,
}: UserFields): Partial<UserFields> => {
  const monthStartedAt = inTimeZone(getMonthStartedAt(Date.now()), timeZone)

  if (lastSyncedMonthEndedAt && monthStartedAt <= lastSyncedMonthEndedAt) {
    return {}
  }

  const previousMonthsSets = getSetsFinishedBefore(sets, monthStartedAt)

  const unsyncedSets = lastSyncedMonthEndedAt
    ? getSetsStartedAfter(previousMonthsSets, lastSyncedMonthEndedAt)
    : previousMonthsSets

  if (!unsyncedSets.length) {
    return {}
  }

  const keepSetsStartedAfter =
    Date.now() -
    convertDuration(
      Math.max(...Object.values(scoreboardPeriodInDays), 31),
      'd',
      'ms',
    )

  const newMonths = trackTime({
    sets: unsyncedSets,
    trackedTime: months,
    getPeriodKey: (timestamp) =>
      monthToString(toMonth(inTimeZone(timestamp, timeZone))),
  })

  const omitMonthsAfter = inTimeZone(
    subMonths(monthStartedAt, maxMonths).getTime(),
    timeZone,
  )
  const filteredMonths = recordFilter(newMonths, ({ key }) => {
    const month = stringToMonth(key)
    const monthStartedAt = inTimeZone(fromMonth(month), timeZone)
    return monthStartedAt >= omitMonthsAfter
  })

  return {
    months: filteredMonths,
    sets: getSetsStartedAfter(sets, keepSetsStartedAfter),
    lastSyncedMonthEndedAt: monthStartedAt,
  }
}
