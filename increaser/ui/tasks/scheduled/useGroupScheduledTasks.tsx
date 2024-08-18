import { useCallback } from 'react'
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
import { ScheduledTask } from '@increaser/entities/Task'
import { range } from '@lib/utils/array/range'
import { useTaskTimeGrouping } from '../timeGrouping/useTaskTimeGrouping'
import { getGroupId, ScheduledTaskGroupId } from './ScheduledTaskGroupId'
import { Entry } from '@lib/utils/entities/Entry'

export const useGroupScheduledTasks = () => {
  const [timeGrouping] = useTaskTimeGrouping()

  return useCallback(
    (items: ScheduledTask[]) => {
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

      const lastGroupEndsAt = Math.max(...options)

      const thisGroupEndsAt = match(timeGrouping, {
        day: () => endOfDay(now).getTime(),
        week: () => getWeekEndedAt(now),
      })
      const groupsCount =
        match(timeGrouping, {
          day: () => differenceInDays(lastGroupEndsAt, thisGroupEndsAt),
          week: () => differenceInWeeks(lastGroupEndsAt, thisGroupEndsAt),
        }) + 1

      let result: Entry<ScheduledTaskGroupId, ScheduledTask[]>[] = []

      range(groupsCount).forEach((index) => {
        const groupEndsAt = match(timeGrouping, {
          day: () => endOfDay(addDays(now, index)).getTime(),
          week: () => getWeekEndedAt(addWeeks(now, index).getTime()),
        })

        const key = groupEndsAt.toString()
        result.push({
          key,
          value: [],
        })
      })

      items.forEach((task) => {
        const key = getGroupId({
          deadlineAt: task.deadlineAt,
          timeGroup: timeGrouping,
        })
        if (key === 'overdue' && result[0].key !== 'overdue') {
          result = [
            {
              key: 'overdue',
              value: [],
            },
            ...result,
          ]
        }
        result = result.map((group) => {
          if (group.key === key) {
            return {
              key,
              value: [...group.value, task],
            }
          }

          return group
        })
      })

      return result
    },
    [timeGrouping],
  )
}
