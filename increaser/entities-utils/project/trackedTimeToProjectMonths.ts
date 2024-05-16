import { TrackedTime } from '@increaser/entities/TrackedTime'
import { ProjectMonth } from '@increaser/entities/timeTracking'
import { order } from '@lib/utils/array/order'
import { recordMap } from '@lib/utils/record/recordMap'
import { fromMonth, stringToMonth } from '@lib/utils/time/Month'

type trackedTimeToProjectMonthsInput = {
  trackedTime: TrackedTime
}

export const trackedTimeToProjectMonths = ({
  trackedTime,
}: trackedTimeToProjectMonthsInput): Record<string, ProjectMonth[]> => {
  const result: Record<string, ProjectMonth[]> = {}

  Object.entries(trackedTime).forEach(([monthString, timeRecord]) => {
    const month = stringToMonth(monthString)
    Object.entries(timeRecord).forEach(([projectId, seconds]) => {
      if (!result[projectId]) {
        result[projectId] = []
      }
      result[projectId].push({
        ...month,
        seconds,
      })
    })
  })

  return recordMap(result, (months) => order(months, fromMonth, 'asc'))
}
