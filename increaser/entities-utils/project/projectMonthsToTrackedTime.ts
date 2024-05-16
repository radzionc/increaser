import { TrackedTime } from '@increaser/entities/TrackedTime'
import { ProjectMonth } from '@increaser/entities/timeTracking'
import { monthToString } from '@lib/utils/time/Month'

export const projectMonthsToTrackedTime = (
  projectMonthsRecord: Record<string, ProjectMonth[]>,
): TrackedTime => {
  const result: TrackedTime = {}

  Object.entries(projectMonthsRecord).forEach(([projectId, months]) => {
    months.forEach((month) => {
      const monthString = monthToString(month)
      if (!result[monthString]) {
        result[monthString] = {}
      }
      result[monthString][projectId] = month.seconds
    })
  })

  return result
}
