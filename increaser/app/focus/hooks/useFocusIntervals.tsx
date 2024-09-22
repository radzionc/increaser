import { otherProjectId } from '@increaser/entities/Project'
import { FocusInterval } from '@increaser/ui/focus/FocusContext'
import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'
import { useCallback } from 'react'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useFocusTarget } from '../state/useFocusTarget'
import { correctRecordFields } from '@lib/utils/record/correctRecordFields'
import { getLastItem } from '@lib/utils/array/getLastItem'

export const useFocusIntervals = () => {
  const { tasks, projects } = useAssertUserState()

  const [{ projectId, taskId }] = useFocusTarget()

  return useStateCorrector(
    usePersistentState<FocusInterval[] | null>(
      PersistentStateKey.FocusIntervals,
      null,
    ),
    useCallback(
      (value) => {
        console.log('Correct!')
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
