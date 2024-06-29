import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { getBlocks, getNextFocusDuration } from '@increaser/app/sets/Block'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import { useBrowserNotifications } from '@lib/ui/hooks/useBrowserNotifcations'
import { PersistentStateKey } from '@increaser/ui/state/persistentState'
import { usePersistentState } from '@increaser/ui/state/persistentState'
import { MS_IN_MIN } from '@lib/utils/time'

import { areNotificationsAllowed } from '@lib/ui/notifications/utils'
import { useAddSetMutation } from '@increaser/app/sets/hooks/useAddSetMutation'
import {
  FocusDuration,
  defaultFocusDuration,
} from '@increaser/entities/FocusDuration'
import {
  CurrentSet,
  FocusContext,
  FocusTask,
  StartFocusParams,
  StopFocusParams,
} from '@increaser/ui/focus/FocusContext'
import { CurrentFocusGuard } from '@increaser/ui/focus/CurrentFocusProvider'
import { useUpdateTaskMutation } from '@increaser/ui/tasks/api/useUpdateTaskMutation'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'
import { FocusAutoStop } from '@increaser/ui/focus/FocusAutoStop'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'

interface Props {
  children: ReactNode
}

export const FocusProvider = ({ children }: Props) => {
  const [focusDuration, setFocusDuration] =
    useState<FocusDuration>(defaultFocusDuration)

  const [hasTimerSoundNotification, setHasTimerSoundNotification] =
    usePersistentState<boolean>(
      PersistentStateKey.HasTimerSoundNotification,
      true,
    )

  const todaySets = useTodaySets()

  const [hasTimerBrowserNotification, setHasTimerBrowserNotification] =
    usePersistentState<boolean>(
      PersistentStateKey.HasTimerBrowserNotification,
      areNotificationsAllowed(),
    )

  const { permission } = useBrowserNotifications()

  const { tasks, projects } = useAssertUserState()

  useEffect(() => {
    if (permission && permission !== 'granted' && hasTimerBrowserNotification) {
      setHasTimerBrowserNotification(false)
    }
  }, [hasTimerBrowserNotification, permission, setHasTimerBrowserNotification])

  const [currentSet, setCurrentSet] = useStateCorrector(
    usePersistentState<CurrentSet | null>(PersistentStateKey.CurrentSet, null),
    useCallback(
      (value) => {
        if (!value) {
          return value
        }

        const correctProjectId = (projectId: string) =>
          projects.some((project) => project.id === projectId)
            ? projectId
            : projects[0].id

        const { task, projectId } = value
        if (task) {
          const stateTask = tasks[task.id]
          if (!stateTask) {
            return {
              ...value,
              task: undefined,
              projectId: correctProjectId(projectId),
            }
          }
          if (stateTask.projectId !== projectId) {
            const doesProjectExist = projects.some(
              (project) => project.id === projectId,
            )
            if (doesProjectExist) {
              return {
                ...value,
                projectId,
                task: undefined,
              }
            }
            return {
              ...value,
              projectId: stateTask.projectId,
            }
          }
        }

        if (!projects.find((project) => project.id === projectId)) {
          return {
            ...value,
            projectId: projects[0].id,
          }
        }

        return value
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
      setCurrentSet({
        projectId,
        startedAt,
        task: taskId ? { id: taskId, startedAt } : undefined,
      })
      if (duration) {
        setFocusDuration(duration as FocusDuration)
      }
    },
    [analytics, focusDuration, setCurrentSet],
  )

  const updateStartTime = useCallback(
    (startedAt: number) => {
      setCurrentSet((set) => (set ? { ...set, startedAt } : set))
    },
    [setCurrentSet],
  )

  const updateProject = useCallback(
    (projectId: string) => {
      setCurrentSet((set) => (set ? { ...set, projectId } : set))
    },
    [setCurrentSet],
  )

  const { mutate: addSet } = useAddSetMutation()
  const { mutate: updateTaskMutation } = useUpdateTaskMutation()

  const cancel = useCallback(() => {
    setCurrentSet(null)
  }, [setCurrentSet])

  useEffect(() => {
    if (!currentSet || !currentSet.task) return

    const { id, startedAt } = currentSet.task

    const task = tasks[id]

    if (task.completedAt) {
      setCurrentSet(omit(currentSet, 'task'))
    }

    if (task.completedAt) {
      updateTaskMutation({
        id: task.id,
        fields: {
          spentTime: (task.spentTime || 0) + (Date.now() - startedAt),
        },
      })
    }
  }, [currentSet, setCurrentSet, tasks, updateTaskMutation])

  const stop = useCallback(
    (params: StopFocusParams = {}) => {
      if (!currentSet) return

      const set = {
        start: currentSet.startedAt,
        end: Date.now(),
        projectId: currentSet.projectId,
        ...params?.setOverride,
      }
      const { task } = currentSet

      setCurrentSet(null)

      const blocks = getBlocks([...todaySets, set])

      addSet(set)

      if (task && task.id in tasks) {
        const { spentTime } = tasks[task.id]
        updateTaskMutation({
          id: task.id,
          fields: {
            spentTime: (spentTime || 0) + (Date.now() - task.startedAt),
          },
        })
      }

      setFocusDuration(getNextFocusDuration(blocks))

      analytics.trackEvent('Finish focus session', {
        duration: Math.round(getSetDuration(set) / MS_IN_MIN),
      })
    },
    [
      currentSet,
      setCurrentSet,
      todaySets,
      addSet,
      tasks,
      analytics,
      updateTaskMutation,
    ],
  )

  const updateTask = useCallback(
    (value: FocusTask | undefined) => {
      setCurrentSet((set) => (set ? { ...set, task: value } : set))
    },
    [setCurrentSet],
  )

  return (
    <FocusContext.Provider
      value={{
        start,
        updateStartTime,
        updateProject,
        updateTask,
        stop,
        cancel,
        currentSet,
        focusDuration,
        setFocusDuration,
        setHasTimerSoundNotification,
        hasTimerBrowserNotification,
        setHasTimerBrowserNotification,
        hasTimerSoundNotification,
      }}
    >
      {currentSet ? (
        <CurrentFocusGuard>
          {children}
          <FocusAutoStop />
        </CurrentFocusGuard>
      ) : (
        <>{children}</>
      )}
    </FocusContext.Provider>
  )
}
