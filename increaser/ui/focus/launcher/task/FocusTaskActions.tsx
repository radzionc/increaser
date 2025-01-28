import { useMemo } from 'react'
import { useFilteredFocusTasks } from '../../tasks/useFilteredFocusTasks'
import { FocusTaskAction, FocusTaskActionProps } from './FocusTaskAction'
import { isToday } from 'date-fns'

import { useFocusProjectTask } from '../../state/focusProjectTask'
import { HStack } from '@lib/ui/css/stack'
import { NonEmptyOnly } from '@lib/ui/base/NonEmptyOnly'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { isEmpty } from '@lib/utils/array/isEmpty'

export const FocusTaskActions = () => {
  const options = useFilteredFocusTasks()

  const [, setState] = useFocusProjectTask()

  const todayStartedAt = useStartOfDay()

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
          setState((prev) => ({
            ...prev,
            [task.projectId]: task.id,
          }))
        },
      })
    }

    return result
  }, [options, setState, todayStartedAt])

  return (
    <NonEmptyOnly
      value={actions}
      render={(props) => (
        <HStack alignItems="center" gap={8}>
          {props.map((action) => (
            <FocusTaskAction key={action.name} {...action} />
          ))}
        </HStack>
      )}
    />
  )
}
