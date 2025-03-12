import { makeUseMemoCallback } from '@lib/ui/state/makeUseMemoCallback'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { correctRecordFields } from '@lib/utils/record/correctRecordFields'
import { otherProjectId, ProjectRelatedEntity } from '@product/entities/Project'
import {
  usePersistentState,
  PersistentStateKey,
} from '@product/ui/state/persistentState'
import { useUser } from '@product/ui/user/state/user'

import { useFocusTarget } from './focusTarget'

export type FocusInterval = ProjectRelatedEntity & {
  taskId: string | null
  start: number
  end: number | null
}

const useCallback = makeUseMemoCallback()

export const useFocusIntervals = () => {
  const { tasks, projects } = useUser()

  const { projectId, taskId } = useFocusTarget()

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
            result = updateAtIndex(result, result.length - 1, (interval) => ({
              ...interval,
              end: now,
            }))

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
}

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
