import { maxWeeks, User } from '@increaser/entities/User'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { getSetsFinishedBefore } from '@increaser/entities-utils/set/getSetsFinishedBefore'
import { getSetsStartedAfter } from '@increaser/entities-utils/set/getSetsStartedAfter'
import { trackTime } from './trackTime'
import {
  fromWeek,
  stringToWeek,
  toWeek,
  weekToString,
} from '@lib/utils/time/Week'
import { subWeeks } from 'date-fns'
import { recordFilter } from '@lib/utils/record/recordFilter'
import { startOfISOWeek } from 'date-fns'

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
  const weekStartedAt = inTimeZone(
    startOfISOWeek(Date.now()).getTime(),
    timeZone,
  )

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

  const newWeeks = trackTime({
    sets: unsyncedSets,
    trackedTime: weeks,
    getPeriodKey: (timestamp) =>
      weekToString(toWeek(inTimeZone(timestamp, timeZone))),
  })

  const omitWeeksAfter = inTimeZone(
    subWeeks(weekStartedAt, maxWeeks).getTime(),
    timeZone,
  )
  const filteredWeeks = recordFilter(newWeeks, ({ key }) => {
    const month = stringToWeek(key)
    const monthStartedAt = inTimeZone(fromWeek(month), timeZone)
    return monthStartedAt >= omitWeeksAfter
  })

  return {
    weeks: filteredWeeks,
    lastSyncedWeekEndedAt: weekStartedAt,
  }
}
