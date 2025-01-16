import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { TrackedTime } from '@increaser/entities/TrackedTime'
import { Set } from '@increaser/entities/User'
import { convertDuration } from '@lib/utils/time/convertDuration'

type TrackTimeInput = {
  sets: Set[]
  trackedTime: TrackedTime
  getPeriodKey: (timestamp: number) => string
}

export const trackTime = ({
  sets,
  trackedTime,
  getPeriodKey,
}: TrackTimeInput) => {
  const result = { ...trackedTime }
  sets.forEach((set) => {
    const periodKey = getPeriodKey(set.end)
    if (!result[periodKey]) {
      result[periodKey] = {}
    }

    const { projectId } = set

    const seconds = Math.round(convertDuration(getSetDuration(set), 'ms', 's'))

    result[periodKey] = {
      ...result[periodKey],
      [projectId]: (result[periodKey][projectId] ?? 0) + seconds,
    }
  })

  return result
}
