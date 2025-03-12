import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'
import { MS_IN_MIN } from '@lib/utils/time'
import { getSetsDuration } from '@product/entities-utils/set/getSetsDuration'
import { focusIntervalsToSets } from '@product/ui/focus/utils/focusIntervalsToSets'
import { getTasksTimeSpent } from '@product/ui/focus/utils/getTasksTimeSpent'
import { useAddSetsMutation } from '@product/ui/sets/api/useAddSetsMutation'
import { useUser } from '@product/ui/user/state/user'
import { useUpdateUserEntitiesMutation } from '@product/ui/userEntity/api/useUpdateUserEntitiesMutation'
import { useCallback } from 'react'

import {
  useAssertFocusIntervals,
  useFocusIntervals,
} from '../state/focusIntervals'

export type StopFocusParams = {
  isEndEstimated?: boolean
  end?: number
}

export const useStopFocus = () => {
  const [, setIntervals] = useFocusIntervals()

  const { tasks } = useUser()

  const intervals = useAssertFocusIntervals()

  const analytics = useAnalytics()

  const { mutate: addSets } = useAddSetsMutation({
    onOptimisticUpdate: () => setIntervals(null),
  })
  const { mutate: updateTasks } = useUpdateUserEntitiesMutation('task')

  return useCallback(
    ({ isEndEstimated, end }: StopFocusParams = {}) => {
      let correctedIntervals = [...intervals]
      if (end) {
        correctedIntervals = updateAtIndex(
          correctedIntervals,
          correctedIntervals.length - 1,
          (interval) => ({
            ...interval,
            end,
          }),
        )
      }

      const sets = focusIntervalsToSets({
        intervals: correctedIntervals,
        now: Date.now(),
      })

      if (isEndEstimated) {
        sets[sets.length - 1].isEndEstimated = isEndEstimated
      }

      const timeSpentRecord = getTasksTimeSpent(correctedIntervals)

      addSets(sets)

      const taskUpdates = withoutUndefined(
        Object.entries(timeSpentRecord).map(([taskId, spentTime]) => {
          const task = tasks[taskId]
          if (task) {
            return {
              id: taskId,
              fields: {
                spentTime: (task.spentTime || 0) + spentTime,
              },
            }
          }
        }),
      )
      if (taskUpdates.length) {
        updateTasks(taskUpdates)
      }

      analytics.trackEvent('Finish focus session', {
        duration: Math.round(getSetsDuration(sets) / MS_IN_MIN),
      })
    },
    [addSets, analytics, intervals, tasks, updateTasks],
  )
}
