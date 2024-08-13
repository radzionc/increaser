import { Task } from '@increaser/entities/Task'
import { specialTodoTaskGroupName } from '@increaser/ui/tasks/TodoTaskGroupId'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { order } from '@lib/utils/array/order'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { toEntries } from '@lib/utils/record/toEntries'
import { getWeekEndedAt } from '@lib/utils/time/getWeekEndedAt'
import { endOfDay, format } from 'date-fns'
import { useMemo } from 'react'

export type TaskGroup = {
  name: string
  tasks: Task[]
}

export const useFocusTaskGroups = () => {
  const { tasks } = useAssertUserState()

  return useMemo(() => {
    const overdueTasks: Task[] = []
    const thisWeekTasks: Record<number, Task[]> = {}
    const unscheduledTasks: Task[] = []

    const now = Date.now()
    const weekEndsAt = getWeekEndedAt(now)
    const todayEndsAt = endOfDay(now).getTime()

    Object.values(tasks).forEach((task) => {
      if (task.status !== 'todo') {
        return
      }

      if (task.deadlineAt) {
        if (task.deadlineAt > weekEndsAt) {
          return
        }

        if (task.deadlineAt < now) {
          overdueTasks.push(task)
        } else {
          const key = endOfDay(task.deadlineAt).getTime()
          thisWeekTasks[key] = [...(thisWeekTasks[key] || []), task]
        }
      } else {
        unscheduledTasks.push(task)
      }
    })

    const result: TaskGroup[] = []
    if (!isEmpty(overdueTasks)) {
      result.push({
        name: specialTodoTaskGroupName.overdue,
        tasks: sortEntitiesWithOrder(overdueTasks),
      })
    }

    order(toEntries(thisWeekTasks), (v) => Number(v.key), 'asc').forEach(
      ({ key, value }) => {
        const timestamp = Number(key)
        const name =
          timestamp === todayEndsAt
            ? 'For today'
            : `By ${format(timestamp, 'EEEE')}`

        result.push({ name, tasks: sortEntitiesWithOrder(value) })
      },
    )

    if (!isEmpty(unscheduledTasks)) {
      result.push({
        name: specialTodoTaskGroupName.todo,
        tasks: sortEntitiesWithOrder(unscheduledTasks),
      })
    }

    return result
  }, [tasks])
}
