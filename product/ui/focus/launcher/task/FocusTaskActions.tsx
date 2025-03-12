import { NonEmptyOnly } from '@lib/ui/base/NonEmptyOnly'
import { HStack } from '@lib/ui/css/stack'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { isToday } from 'date-fns'
import { useMemo } from 'react'

import { useFocusProject } from '../../state/focusProject'
import { useFocusProjectTask } from '../../state/focusProjectTask'
import { useFilteredFocusTasks } from '../../tasks/useFilteredFocusTasks'

import { FocusTaskAction, FocusTaskActionProps } from './FocusTaskAction'

export const FocusTaskActions = () => {
  const options = useFilteredFocusTasks()

  const [, setState] = useFocusProjectTask()

  const todayStartedAt = useStartOfDay()

  const [, setFocusProject] = useFocusProject()

  const actions = useMemo(() => {
    const result: FocusTaskActionProps[] = []

    const tasksForToday = options.filter(
      (task) => task.deadlineAt && isToday(task.deadlineAt),
    )

    if (!isEmpty(tasksForToday)) {
      const [task] = tasksForToday

      result.push({
        name: 'Today',
        value: tasksForToday.length,
        onClick: () => {
          setFocusProject(task.projectId)
          setState((prev) => ({
            ...prev,
            [task.projectId]: task.id,
          }))
        },
      })
    }

    const overdueTasks = options.filter(
      (task) => task.deadlineAt && task.deadlineAt < todayStartedAt,
    )

    if (!isEmpty(overdueTasks)) {
      const [task] = overdueTasks

      result.push({
        name: 'Overdue',
        value: overdueTasks.length,
        kind: 'idle',
        onClick: () => {
          setFocusProject(task.projectId)
          setState((prev) => ({
            ...prev,
            [task.projectId]: task.id,
          }))
        },
      })
    }

    return result
  }, [options, setFocusProject, setState, todayStartedAt])

  return (
    <NonEmptyOnly
      value={actions}
      render={(props) => (
        <HStack alignItems="center" fullHeight gap={2}>
          {props.map((action) => (
            <FocusTaskAction key={action.name} {...action} />
          ))}
        </HStack>
      )}
    />
  )
}
