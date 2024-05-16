import { TrackedTime } from '@increaser/entities/TrackedTime'
import { ProjectWeek } from '@increaser/entities/timeTracking'
import { order } from '@lib/utils/array/order'
import { recordMap } from '@lib/utils/record/recordMap'
import { fromWeek, stringToWeek } from '@lib/utils/time/Week'

type TrackedTimeToProjectWeeksInput = {
  trackedTime: TrackedTime
}

export const trackedTimeToProjectWeeks = ({
  trackedTime,
}: TrackedTimeToProjectWeeksInput): Record<string, ProjectWeek[]> => {
  const result: Record<string, ProjectWeek[]> = {}

  Object.entries(trackedTime).forEach(([weekString, timeRecord]) => {
    const week = stringToWeek(weekString)
    Object.entries(timeRecord).forEach(([projectId, seconds]) => {
      if (!result[projectId]) {
        result[projectId] = []
      }
      result[projectId].push({
        ...week,
        seconds,
      })
    })
  })

  return recordMap(result, (weeks) => order(weeks, fromWeek, 'asc'))
}
