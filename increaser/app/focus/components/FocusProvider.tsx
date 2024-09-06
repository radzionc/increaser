import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { useCallback, useEffect, useState } from 'react'
import { getBlocks, getNextFocusDuration } from '@increaser/app/sets/Block'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import { PersistentStateKey } from '@increaser/ui/state/persistentState'
import { usePersistentState } from '@increaser/ui/state/persistentState'
import { MS_IN_MIN } from '@lib/utils/time'

import {
  FocusDuration,
  defaultFocusDuration,
} from '@increaser/entities/FocusDuration'
import {
  FocusContext,
  FocusInterval,
  FocusSession,
  StartFocusParams,
  StopFocusParams,
} from '@increaser/ui/focus/FocusContext'
import { CurrentFocusGuard } from '@increaser/ui/focus/CurrentFocusProvider'
import { FocusNotificationsManager } from '@increaser/ui/focus/FocusNotificationsManager'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { FocusAutoStop } from '@increaser/ui/focus/FocusAutoStop'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useUpdateUserEntitiesMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntitiesMutation'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { otherProjectId } from '@increaser/entities/Project'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { getTasksTimeSpent } from '@increaser/ui/focus/utils/getTasksTimeSpent'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { pick } from '@lib/utils/record/pick'
import { useAddSetsMutation } from '@increaser/ui/sets/api/useAddSetsMutation'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'
import { Minutes } from '@lib/utils/time/types'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { FocusLauncherSynchronizer } from '../launcher/FocusLauncherSynchronizer'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const FocusProvider = ({ children }: ComponentWithChildrenProps) => {
  const [focusDuration, setFocusDuration] =
    useState<FocusDuration>(defaultFocusDuration)

  const todaySets = useTodaySets()

  const { tasks, projects } = useAssertUserState()

  const [session, setSession] = useStateCorrector(
    usePersistentState<FocusSession | null>(
      PersistentStateKey.FocusSession,
      null,
    ),
    useCallback(
      (value) => {
        if (!value) {
          return value
        }

        let result = value

        result.intervals.forEach((interval, index) => {
          const updateInterval = (params: Partial<FocusInterval>) => {
            result = {
              ...result,
              intervals: updateAtIndex(result.intervals, index, (interval) => ({
                ...interval,
                ...params,
              })),
            }
          }
          if (interval.taskId) {
            const stateTask = tasks[interval.taskId]
            if (!stateTask) {
              updateInterval({
                taskId: null,
                projectId:
                  interval.projectId in projects
                    ? interval.projectId
                    : otherProjectId,
              })
            } else if (stateTask.projectId !== interval.projectId) {
              updateInterval({
                projectId: stateTask.projectId,
              })
            }
          }

          if (!(interval.projectId in projects)) {
            updateInterval({
              projectId: otherProjectId,
            })
          }
        })

        return result
      },
      [projects, tasks],
    ),
  )

  const analytics = useAnalytics()

  const start = useCallback(
    ({ projectId, duration, taskId, startedAt }: StartFocusParams) => {
      analytics.trackEvent('Start focus session', {
        duration: focusDuration,
      })
      setSession({
        intervals: [
          {
            start: startedAt,
            taskId,
            projectId,
            end: null,
          },
        ],
      })
      if (duration) {
        setFocusDuration(duration as FocusDuration)
      }
    },
    [analytics, focusDuration, setSession],
  )

  const startNewInterval = useCallback(
    ({ projectId, taskId }: Pick<FocusInterval, 'projectId' | 'taskId'>) => {
      const now = Date.now()
      setSession((session) =>
        session
          ? {
              ...session,
              intervals: [
                ...updateAtIndex(
                  session.intervals,
                  session.intervals.length - 1,
                  (interval) => ({
                    ...interval,
                    end: now,
                  }),
                ),
                {
                  start: now,
                  end: null,
                  taskId,
                  projectId,
                },
              ],
            }
          : session,
      )
    },
    [setSession],
  )

  const { mutate: addSets } = useAddSetsMutation()
  const { mutate: updateTasks } = useUpdateUserEntitiesMutation('task')
  const { mutate: updateTaskMutation } = useUpdateUserEntityMutation('task')

  const cancel = useCallback(() => {
    setSession(null)
  }, [setSession])

  useEffect(() => {
    if (!session) return

    const taskId = getLastItem(session.intervals)?.taskId
    if (!taskId) return

    const task = tasks[taskId]

    if (task.status === 'done') {
      startNewInterval({
        projectId: task.projectId,
        taskId: null,
      })
    }
  }, [session, startNewInterval, tasks])

  const stop = useCallback(
    ({ lastSetOverride }: StopFocusParams = {}) => {
      if (!session) return

      const { intervals } = session

      let sets = focusIntervalsToSets({
        intervals,
        now: Date.now(),
      })
      if (lastSetOverride) {
        sets = updateAtIndex(sets, sets.length - 1, (set) => ({
          ...set,
          ...lastSetOverride,
        }))
      }

      setSession(null)

      const blocks = getBlocks([...todaySets, ...sets])

      addSets(sets)

      const timeSpentRecord = getTasksTimeSpent(intervals)

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
    [addSets, analytics, session, setSession, tasks, todaySets, updateTasks],
  )

  const updateProject = useCallback(
    (projectId: string) => {
      startNewInterval({
        projectId,
        taskId: null,
      })
    },
    [startNewInterval],
  )

  const updateTask = useCallback(
    (taskId: string | null) => {
      startNewInterval({
        projectId: taskId
          ? tasks[taskId].projectId
          : getLastItem(shouldBePresent(session).intervals).projectId,
        taskId,
      })
    },
    [session, startNewInterval, tasks],
  )

  const pause = useCallback(() => {
    const now = Date.now()
    setSession((session) =>
      session
        ? {
            ...session,
            intervals: [
              ...updateAtIndex(
                session.intervals,
                session.intervals.length - 1,
                (interval) => ({
                  ...interval,
                  end: now,
                }),
              ),
            ],
          }
        : session,
    )
  }, [setSession])

  const resume = useCallback(() => {
    setSession((session) =>
      session
        ? {
            ...session,
            intervals: [
              ...session.intervals,
              {
                start: Date.now(),
                end: null,
                ...pick(getLastItem(session.intervals), [
                  'projectId',
                  'taskId',
                ]),
              },
            ],
          }
        : session,
    )
  }, [setSession])

  const reduceLastInterval = useCallback(
    (duration: Minutes) => {
      const now = Date.now()
      setSession((session) =>
        session
          ? {
              ...session,
              intervals: [
                ...updateAtIndex(
                  session.intervals,
                  session.intervals.length - 1,
                  (interval) => ({
                    ...interval,
                    end: now - convertDuration(duration, 'min', 'ms'),
                  }),
                ),
                {
                  start: now,
                  end: null,
                  ...pick(getLastItem(session.intervals), [
                    'projectId',
                    'taskId',
                  ]),
                },
              ],
            }
          : session,
      )
    },
    [setSession],
  )

  useEffect(() => {
    if (!session) return

    const { taskId } = getLastItem(session.intervals)
    if (!taskId) return

    const task = tasks[taskId]
    if (!task) return

    if (task.status === 'inProgress' || task.status === 'done') return

    updateTaskMutation({
      id: taskId,
      fields: {
        status: 'inProgress',
      },
    })
  }, [session, tasks, updateTaskMutation])

  return (
    <FocusContext.Provider
      value={{
        start,
        pause,
        resume,
        updateProject,
        updateTask,
        stop,
        cancel,
        session,
        focusDuration,
        setFocusDuration,
        reduceLastInterval,
      }}
    >
      {session ? (
        <CurrentFocusGuard>
          {children}
          <FocusAutoStop />
          <FocusLauncherSynchronizer />
          <FocusNotificationsManager />
        </CurrentFocusGuard>
      ) : (
        <>{children}</>
      )}
    </FocusContext.Provider>
  )
}
