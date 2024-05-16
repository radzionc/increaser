import { User } from '@increaser/entities/User'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { getSetsFinishedBefore } from '@increaser/entities-utils/set/getSetsFinishedBefore'
import { getSetsStartedAfter } from '@increaser/entities-utils/set/getSetsStartedAfter'
import { trackTime } from './trackTime'
import { toWeek, weekToString } from '@lib/utils/time/Week'

type UserFields = Pick<
  User,
  'sets' | 'timeZone' | 'lastSyncedWeekEndedAt' | 'weeks'
>

export const organizeWeeks = ({
  timeZone,
  lastSyncedWeekEndedAt,
  sets,
  weeks,
}: UserFields): Partial<UserFields> => {
  const weekStartedAt = inTimeZone(getWeekStartedAt(Date.now()), timeZone)

  if (lastSyncedWeekEndedAt && weekStartedAt <= lastSyncedWeekEndedAt) {
    return {}
  }

  const previousWeekSets = getSetsFinishedBefore(sets, weekStartedAt)

  const unsyncedSets = lastSyncedWeekEndedAt
    ? getSetsStartedAfter(previousWeekSets, lastSyncedWeekEndedAt)
    : previousWeekSets

  if (!unsyncedSets.length) {
    return {}
  }

  return {
    weeks: trackTime({
      sets: unsyncedSets,
      trackedTime: weeks,
      getPeriodKey: (timestamp) => weekToString(toWeek(timestamp)),
      targetTimeZoneOffset: timeZone,
    }),
    lastSyncedWeekEndedAt: weekStartedAt,
  }
}
