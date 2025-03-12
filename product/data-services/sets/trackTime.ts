import { convertDuration } from '@lib/utils/time/convertDuration'
import { TrackedTime } from '@product/entities/TrackedTime'
import { Set } from '@product/entities/User'
import { getSetDuration } from '@product/entities-utils/set/getSetDuration'

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
