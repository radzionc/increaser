import { useCallback } from 'react'
import {
  useAssertFocusIntervals,
  useFocusIntervals,
} from '../state/focusIntervals'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { getTasksTimeSpent } from '@increaser/ui/focus/utils/getTasksTimeSpent'
import { useAddSetsMutation } from '@increaser/ui/sets/api/useAddSetsMutation'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useUpdateUserEntitiesMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntitiesMutation'
import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'
import { MS_IN_MIN } from '@lib/utils/time'
import { getBlocks, getNextFocusDuration } from '../../sets/Block'
import { useTodaySets } from '../../sets/hooks/useTodaySets'
import { useFocusDuration } from '../state/focusDuration'

export type StopFocusParams = {
  isEndEstimated?: boolean
  end?: number
}

export const useStopFocus = () => {
  const [, setIntervals] = useFocusIntervals()
  const todaySets = useTodaySets()
  const [, setFocusDuration] = useFocusDuration()

  const { tasks } = useAssertUserState()

  const intervals = useAssertFocusIntervals()

  const analytics = useAnalytics()

  const { mutate: addSets } = useAddSetsMutation()
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

      setIntervals(null)

      const sets = focusIntervalsToSets({
        intervals: correctedIntervals,
        now: Date.now(),
      })

      if (isEndEstimated) {
        sets[sets.length - 1].isEndEstimated = isEndEstimated
      }

      const timeSpentRecord = getTasksTimeSpent(correctedIntervals)

      const blocks = getBlocks([...todaySets, ...sets])

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

      setFocusDuration(getNextFocusDuration(blocks))

      analytics.trackEvent('Finish focus session', {
        duration: Math.round(getSetsDuration(sets) / MS_IN_MIN),
      })
    },
    [
      addSets,
      analytics,
      intervals,
      setFocusDuration,
      setIntervals,
      tasks,
      todaySets,
      updateTasks,
    ],
  )
}
