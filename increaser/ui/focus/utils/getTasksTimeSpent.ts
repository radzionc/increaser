import { FocusInterval } from '@increaser/ui/focus/state/focusIntervals'

export const getTasksTimeSpent = (intervals: FocusInterval[]) => {
  const result: Record<string, number> = {}

  intervals.forEach(({ taskId, start, end }) => {
    if (!taskId) {
      return
    }

    if (!result[taskId]) {
      result[taskId] = 0
    }

    result[taskId] += (end ?? Date.now()) - start
  })

  return result
}
