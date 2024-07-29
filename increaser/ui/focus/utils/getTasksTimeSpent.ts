import { FocusInterval } from '../FocusContext'

export const getTasksTimeSpent = (intervals: FocusInterval[]) => {
  const result: Record<string, number> = {}

  intervals.forEach(({ taskId, start, end }) => {
    if (!taskId) {
      return
    }

    if (!result[taskId]) {
      result[taskId] = 0
    }

    result[taskId] += end ? end - start : Date.now() - start
  })

  return result
}
