import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { TrackedTime, unknownProjectKey } from '@increaser/entities/TrackedTime'
import { Set } from '@increaser/entities/User'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { inTimeZone } from '@lib/utils/time/inTimeZone'

type TrackTimeInput = {
  sets: Set[]
  trackedTime: TrackedTime
  getPeriodKey: (timestamp: number) => string
  targetTimeZoneOffset: number
}

export const trackTime = ({
  sets,
  trackedTime,
  getPeriodKey,
  targetTimeZoneOffset,
}: TrackTimeInput) => {
  const result = { ...trackedTime }
  sets.forEach((set) => {
    const timestamp = inTimeZone(set.end, targetTimeZoneOffset)

    const periodKey = getPeriodKey(timestamp)
    if (!result[periodKey]) {
      result[periodKey] = {}
    }

    const activityKey = set.projectId || unknownProjectKey
    if (!result[periodKey][activityKey]) {
      result[periodKey] = {
        ...result[periodKey],
        [activityKey]: 0,
      }
    }

    result[periodKey][activityKey] += Math.round(
      convertDuration(getSetDuration(set), 'ms', 's'),
    )
  })

  return result
}
