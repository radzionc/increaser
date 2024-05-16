import { TrackedTime } from '@increaser/entities/TrackedTime'
import { ProjectWeek } from '@increaser/entities/timeTracking'
import { weekToString } from '@lib/utils/time/Week'

export const projectWeeksToTrackedTime = (
  projectWeeksRecord: Record<string, ProjectWeek[]>,
): TrackedTime => {
  const result: TrackedTime = {}

  Object.entries(projectWeeksRecord).forEach(([projectId, weeks]) => {
    weeks.forEach((week) => {
      const weekString = weekToString(week)
      if (!result[weekString]) {
        result[weekString] = {}
      }
      result[weekString][projectId] = week.seconds
    })
  })

  return result
}
