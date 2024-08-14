import { useMemo } from 'react'
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
import { ScheduledTask, Task } from '@increaser/entities/Task'
import { range } from '@lib/utils/array/range'
import { useAssertUserState } from '../../user/UserStateContext'
import { useTaskTimeGrouping } from '../timeGrouping/useTaskTimeGrouping'
import { getGroupId, ScheduledTaskGroupId } from './ScheduledTaskGroupId'

export const useGroupedScheduledTasks = (): Record<
  ScheduledTaskGroupId,
  Task[]
> => {
  const [timeGrouping] = useTaskTimeGrouping()

  const { tasks } = useAssertUserState()

  const items = useMemo(() => {
    return Object.values(tasks).filter(
      (task) => task.deadlineAt && task.status !== 'done',
    ) as ScheduledTask[]
  }, [tasks])

  const lastGroupEndsAt = useMemo(() => {
    const now = Date.now()
    const nextWeekEndsAt = getWeekEndedAt(addWeeks(now, 1).getTime())
    const options = [nextWeekEndsAt]

    const deadlines = items.map((task) => task.deadlineAt)
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
  }, [items, timeGrouping])

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

    const result: Record<ScheduledTaskGroupId, Task[]> = {}

    range(groupsCount).forEach((index) => {
      const groupEndsAt = match(timeGrouping, {
        day: () => endOfDay(addDays(now, index)).getTime(),
        week: () => getWeekEndedAt(addWeeks(now, index).getTime()),
      })

      const key = groupEndsAt.toString()
      result[key] = []
    })

    items.forEach((task) => {
      const key = getGroupId({
        deadlineAt: task.deadlineAt,
        timeGroup: timeGrouping,
      })
      result[key] = result[key] || []
      result[key].push(task)
    })

    return result
  }, [items, lastGroupEndsAt, timeGrouping])
}
