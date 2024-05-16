import { getSetsFinishedBefore } from '@increaser/entities-utils/set/getSetsFinishedBefore'
import { getSetsStartedAfter } from '@increaser/entities-utils/set/getSetsStartedAfter'
import { scoreboardPeriodInDays } from '@increaser/entities/PerformanceScoreboard'
import { User } from '@increaser/entities/User'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getMonthStartedAt } from '@lib/utils/time/getMonthStartedAt'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { trackTime } from './trackTime'
import { monthToString, toMonth } from '@lib/utils/time/Month'

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

  return {
    months: trackTime({
      sets: unsyncedSets,
      trackedTime: months,
      getPeriodKey: (timestamp) => monthToString(toMonth(timestamp)),
      targetTimeZoneOffset: timeZone,
    }),
    sets: getSetsStartedAfter(sets, keepSetsStartedAfter),
    lastSyncedMonthEndedAt: monthStartedAt,
  }
}
