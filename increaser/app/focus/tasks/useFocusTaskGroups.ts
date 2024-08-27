import { Task, taskStatusName } from '@increaser/entities/Task'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { order } from '@lib/utils/array/order'
import { toEntries } from '@lib/utils/record/toEntries'
import { endOfDay, format } from 'date-fns'
import { useMemo } from 'react'
import { useUncompleteTasks } from '@increaser/ui/tasks/useUncompleteTasks'
import { endOfISOWeek } from 'date-fns'

export type TaskGroup = {
  name: string
  tasks: Task[]
}

export const useFocusTaskGroups = () => {
  const tasks = useUncompleteTasks()

  return useMemo(() => {
    const overdueTasks: Task[] = []
    const thisWeekTasks: Record<number, Task[]> = {}
    const inProgressTasks: Task[] = []
    const todoTasks: Task[] = []

    const now = Date.now()
    const weekEndsAt = endOfISOWeek(now).getTime()
    const todayEndsAt = endOfDay(now).getTime()

    tasks.forEach((task) => {
      if (task.deadlineAt && task.deadlineAt <= weekEndsAt) {
        if (task.deadlineAt < now) {
          overdueTasks.push(task)
        } else {
          const key = endOfDay(task.deadlineAt).getTime()
          thisWeekTasks[key] = [...(thisWeekTasks[key] || []), task]
        }

        return
      }

      if (task.status === 'inProgress') {
        inProgressTasks.push(task)
      } else if (task.status === 'todo') {
        todoTasks.push(task)
      }
    })

    const result: TaskGroup[] = []
    if (!isEmpty(overdueTasks)) {
      result.push({
        name: 'Overdue',
        tasks: overdueTasks,
      })
    }

    order(toEntries(thisWeekTasks), (v) => Number(v.key), 'asc').forEach(
      ({ key, value }) => {
        const timestamp = Number(key)
        const name =
          timestamp === todayEndsAt
            ? 'For today'
            : `By ${format(timestamp, 'EEEE')}`

        result.push({ name, tasks: value })
      },
    )

    if (!isEmpty(inProgressTasks)) {
      result.push({
        name: taskStatusName.inProgress,
        tasks: inProgressTasks,
      })
    }

    if (!isEmpty(todoTasks)) {
      result.push({
        name: taskStatusName.todo,
        tasks: todoTasks,
      })
    }

    return result
  }, [tasks])
}
