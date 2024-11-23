import { useCallback } from 'react'
import { useFocusIntervals } from '../state/focusIntervals'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Minutes } from '@lib/utils/time/types'
import { useFocusTarget } from '../state/focusTarget'

export const useReduceLastFocusInterval = () => {
  const { projectId, taskId } = useFocusTarget()
  const [, setIntervals] = useFocusIntervals()

  return useCallback(
    (duration: Minutes) => {
      const now = Date.now()
      setIntervals((intervals) => [
        ...updateAtIndex(
          shouldBePresent(intervals),
          shouldBePresent(intervals).length - 1,
          (interval) => ({
            ...interval,
            end: now - convertDuration(duration, 'min', 'ms'),
          }),
        ),
        {
          start: now,
          end: null,
          projectId: shouldBePresent(projectId),
          taskId,
        },
      ])
    },
    [projectId, setIntervals, taskId],
  )
}
