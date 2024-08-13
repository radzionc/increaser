import { useMemo } from 'react'
import { useTasksToDo } from '../useTasksToDo'
import { withoutNull } from '@lib/utils/array/withoutNull'
import { getWeekEndedAt } from '@lib/utils/time/getWeekEndedAt'
import {
  addWeeks,
  addDays,
  endOfDay,
  endOfMonth,
  differenceInWeeks,
  differenceInDays,
} from 'date-fns'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { match } from '@lib/utils/match'
import { useTaskTimeGrouping } from './useTaskTimeGrouping'
import { getGroupId, TodoTaskGroupId } from '../TodoTaskGroupId'
import { Task } from '@increaser/entities/Task'
import { range } from '@lib/utils/array/range'

export const useGroupedTasksToDo = (): Record<TodoTaskGroupId, Task[]> => {
  const [timeGrouping] = useTaskTimeGrouping()

  const tasks = useTasksToDo()

  const lastGroupEndsAt = useMemo(() => {
    const now = Date.now()
    const nextWeekEndsAt = getWeekEndedAt(addWeeks(now, 1).getTime())
    const options = [nextWeekEndsAt]

    const deadlines = withoutNull(tasks.map((task) => task.deadlineAt))
    if (!isEmpty(deadlines)) {
      const maxDeadline = Math.max(...deadlines)

      options.push(
        match(timeGrouping, {
          day: () => endOfDay(maxDeadline).getTime(),
          week: () => getWeekEndedAt(maxDeadline),
        }),
      )
    }

    if (timeGrouping === 'day') {
      options.push(endOfMonth(now).getTime())
    }

    return Math.max(...options)
  }, [tasks, timeGrouping])

  return useMemo(() => {
    const now = Date.now()
    const thisGroupEndsAt = match(timeGrouping, {
      day: () => endOfDay(now).getTime(),
      week: () => getWeekEndedAt(now),
    })
    const groupsCount =
      match(timeGrouping, {
        day: () => differenceInDays(lastGroupEndsAt, thisGroupEndsAt),
        week: () => differenceInWeeks(lastGroupEndsAt, thisGroupEndsAt),
      }) + 1

    const result: Record<TodoTaskGroupId, Task[]> = {
      todo: [],
    }

    range(groupsCount).forEach((index) => {
      const groupEndsAt = match(timeGrouping, {
        day: () => endOfDay(addDays(now, index)).getTime(),
        week: () => getWeekEndedAt(addWeeks(now, index).getTime()),
      })

      const key = groupEndsAt.toString()
      result[key] = []
    })

    tasks.forEach((task) => {
      const key = getGroupId({
        deadlineAt: task.deadlineAt,
        timeGroup: timeGrouping,
      })
      result[key] = result[key] || []
      result[key].push(task)
    })

    return result
  }, [lastGroupEndsAt, tasks, timeGrouping])
}
