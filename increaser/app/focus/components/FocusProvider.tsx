import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { useCallback, useEffect, useState } from 'react'
import { getBlocks, getNextFocusDuration } from '@increaser/app/sets/Block'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import { MS_IN_MIN } from '@lib/utils/time'

import {
  FocusDuration,
  defaultFocusDuration,
} from '@increaser/entities/FocusDuration'
import {
  FocusContext,
  StartFocusParams,
  StopFocusParams,
} from '@increaser/ui/focus/FocusContext'
import { FocusNotificationsManager } from '@increaser/ui/focus/FocusNotificationsManager'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { FocusAutoStop } from '@increaser/ui/focus/FocusAutoStop'
import { useUpdateUserEntitiesMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntitiesMutation'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { getTasksTimeSpent } from '@increaser/ui/focus/utils/getTasksTimeSpent'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { useAddSetsMutation } from '@increaser/ui/sets/api/useAddSetsMutation'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'
import { Minutes } from '@lib/utils/time/types'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useFocusTarget } from '../state/useFocusTarget'
import { useFocusIntervals } from '../hooks/useFocusIntervals'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'

export const FocusProvider = ({ children }: ComponentWithChildrenProps) => {
  const [focusDuration, setFocusDuration] =
    useState<FocusDuration>(defaultFocusDuration)

  const todaySets = useTodaySets()

  const { tasks } = useAssertUserState()

  const [{ projectId, taskId }] = useFocusTarget()

  const [intervals, setIntervals] = useFocusIntervals()

  const analytics = useAnalytics()

  const start = useCallback(
    ({ duration, startedAt }: StartFocusParams) => {
      analytics.trackEvent('Start focus session', {
        duration,
      })
      setIntervals([
        {
          start: startedAt,
          taskId,
          projectId: shouldBePresent(projectId),
          end: null,
        },
      ])
      if (duration) {
        setFocusDuration(duration as FocusDuration)
      }
    },
    [analytics, projectId, setIntervals, taskId],
  )

  const { mutate: addSets } = useAddSetsMutation()
  const { mutate: updateTasks } = useUpdateUserEntitiesMutation('task')
  const { mutate: updateTaskMutation } = useUpdateUserEntityMutation('task')

  const cancel = useCallback(() => {
    setIntervals(null)
  }, [setIntervals])

  const stop = useCallback(
    ({ lastSetOverride }: StopFocusParams = {}) => {
      let sets = focusIntervalsToSets({
        intervals: shouldBePresent(intervals),
        now: Date.now(),
      })

      if (lastSetOverride) {
        sets = updateAtIndex(sets, sets.length - 1, (set) => ({
          ...set,
          ...lastSetOverride,
        }))
      }

      const timeSpentRecord = getTasksTimeSpent(shouldBePresent(intervals))

      setIntervals(null)

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
      setIntervals,
      tasks,
      todaySets,
      updateTasks,
    ],
  )

  const pause = useCallback(() => {
    const now = Date.now()
    setIntervals((intervals) =>
      updateAtIndex(
        shouldBePresent(intervals),
        shouldBePresent(intervals).length - 1,
        (interval) => ({
          ...interval,
          end: now,
        }),
      ),
    )
  }, [setIntervals])

  const resume = useCallback(() => {
    setIntervals((intervals) => [
      ...shouldBePresent(intervals),
      {
        start: Date.now(),
        end: null,
        projectId: shouldBePresent(projectId),
        taskId,
      },
    ])
  }, [projectId, setIntervals, taskId])

  const reduceLastInterval = useCallback(
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

  useEffect(() => {
    if (!intervals) return

    const { taskId } = getLastItem(intervals)
    if (!taskId) return

    const task = tasks[taskId]
    if (!task) return

    if (task.status === 'inProgress' || task.status === 'done') return

    const status = 'inProgress'

    updateTaskMutation({
      id: taskId,
      fields: {
        status,
        order: getLastItemOrder(
          Object.values(tasks)
            .filter((task) => task.status === status)
            .map((task) => task.order),
        ),
      },
    })
  }, [intervals, tasks, updateTaskMutation])

  return (
    <FocusContext.Provider
      value={{
        start,
        pause,
        resume,
        stop,
        cancel,
        intervals,
        focusDuration,
        setFocusDuration,
        reduceLastInterval,
      }}
    >
      {intervals && (
        <>
          <FocusAutoStop />
          <FocusNotificationsManager />
        </>
      )}
      <>{children}</>
    </FocusContext.Provider>
  )
}
