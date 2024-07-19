import { TrackedTime } from '@increaser/entities/TrackedTime'
import { ProjectYear } from '@increaser/entities/timeTracking'
import { order } from '@lib/utils/array/order'
import { recordMap } from '@lib/utils/record/recordMap'
import { fromYear, stringToYear } from '@lib/utils/time/Year'

type trackedTimeToProjectYearsInput = {
  trackedTime: TrackedTime
}

export const trackedTimeToProjectYears = ({
  trackedTime,
}: trackedTimeToProjectYearsInput): Record<string, ProjectYear[]> => {
  const result: Record<string, ProjectYear[]> = {}

  Object.entries(trackedTime).forEach(([yearString, timeRecord]) => {
    const year = stringToYear(yearString)
    Object.entries(timeRecord).forEach(([projectId, seconds]) => {
      if (!result[projectId]) {
        result[projectId] = []
      }
      result[projectId].push({
        ...year,
        seconds,
      })
    })
  })

  return recordMap(result, (years) => order(years, fromYear, 'asc'))
}
