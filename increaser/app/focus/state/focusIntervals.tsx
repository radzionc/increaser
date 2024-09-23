import {
  otherProjectId,
  ProjectRelatedEntity,
} from '@increaser/entities/Project'
import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { useCallback } from 'react'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useFocusTarget } from './useFocusTarget'
import { correctRecordFields } from '@lib/utils/record/correctRecordFields'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { memoizeWithProvider } from '@lib/ui/state/memoizeWithProvider'

export type FocusInterval = ProjectRelatedEntity & {
  taskId: string | null
  start: number
  end: number | null
}

export const { provider: FocusIntervalsProvider, useState: useFocusIntervals } =
  memoizeWithProvider<FocusInterval[] | null>({
    useState: () => {
      const { tasks, projects } = useAssertUserState()

      const [{ projectId, taskId }] = useFocusTarget()

      return useStateCorrector(
        usePersistentState<FocusInterval[] | null>(
          PersistentStateKey.FocusIntervals,
          null,
        ),
        useCallback(
          (value) => {
            if (!value) {
              return value
            }

            let result = value

            result.forEach((interval, index) => {
              const handleTask = (interval: FocusInterval) => {
                if (interval.taskId) {
                  const task = tasks[interval.taskId]
                  if (!task) {
                    return {
                      taskId: null,
                    }
                  }

                  if (task.projectId !== interval.projectId) {
                    return {
                      projectId: task.projectId,
                    }
                  }
                }
              }

              const handleProject = (interval: FocusInterval) => {
                const project = projects[interval.projectId]
                if (!project) {
                  return {
                    projectId: otherProjectId,
                  }
                }
              }

              const fields = correctRecordFields(interval, [
                handleTask,
                handleProject,
              ])

              if (fields) {
                result = updateAtIndex(result, index, (interval) => ({
                  ...interval,
                  ...fields,
                }))
              }
            })

            const lastInterval = getLastItem(result)
            if (lastInterval.end === null) {
              if (
                lastInterval.projectId !== projectId ||
                lastInterval.taskId !== taskId
              ) {
                const now = Date.now()
                result = updateAtIndex(
                  result,
                  result.length - 1,
                  (interval) => ({
                    ...interval,
                    end: now,
                  }),
                )

                if (projectId) {
                  result.push({
                    projectId,
                    taskId,
                    start: now,
                    end: null,
                  })
                }
              }
            }

            return result
          },
          [projectId, projects, taskId, tasks],
        ),
      )
    },
    name: 'FocusIntervals',
  })

export const useAssertFocusIntervals = () => {
  const [intervals] = useFocusIntervals()
  return shouldBePresent(intervals)
}

export type FocusStatus = 'active' | 'paused'

export const useFocusStatus = (): FocusStatus | null => {
  const [intervals] = useFocusIntervals()

  if (!intervals) {
    return null
  }

  const lastInterval = getLastItem(intervals)

  return lastInterval.end === null ? 'active' : 'paused'
}

export const useAssertFocusStatus = (): FocusStatus => {
  const status = useFocusStatus()
  return shouldBePresent(status)
}
