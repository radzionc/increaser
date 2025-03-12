import { isEmpty } from '@lib/utils/array/isEmpty'
import { order } from '@lib/utils/array/order'
import { range } from '@lib/utils/array/range'
import { Entry } from '@lib/utils/entities/Entry'
import { match } from '@lib/utils/match'
import { ScheduledTask } from '@product/entities/Task'
import {
  addWeeks,
  addDays,
  endOfDay,
  endOfMonth,
  differenceInWeeks,
  differenceInDays,
} from 'date-fns'
import { endOfISOWeek } from 'date-fns'
import { useCallback } from 'react'

import { useTaskTimeGrouping } from '../timeGrouping/useTaskTimeGrouping'

import { getGroupId, ScheduledTaskGroupId } from './ScheduledTaskGroupId'

export const useGroupScheduledTasks = () => {
  const [timeGrouping] = useTaskTimeGrouping()

  return useCallback(
    (items: ScheduledTask[]) => {
      const now = Date.now()
      const nextNextWeekEndsAt = endOfISOWeek(
        addWeeks(now, 2).getTime(),
      ).getTime()
      const options = [nextNextWeekEndsAt]

      const deadlines = items.map((task) => task.deadlineAt)
      if (!isEmpty(deadlines)) {
        const maxDeadline = Math.max(...deadlines)

        options.push(
          match(timeGrouping, {
            day: () => endOfDay(maxDeadline).getTime(),
            week: () => endOfISOWeek(maxDeadline).getTime(),
          }),
        )
      }

      if (timeGrouping === 'day') {
        options.push(endOfMonth(now).getTime())
      }

      const lastGroupEndsAt = Math.max(...options)

      const thisGroupEndsAt = match(timeGrouping, {
        day: () => endOfDay(now).getTime(),
        week: () => endOfISOWeek(now).getTime(),
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
          week: () => endOfISOWeek(addWeeks(now, index).getTime()).getTime(),
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

      result = result.map(({ value, ...rest }) => ({
        ...rest,
        value: order(value, ({ deadlineOrder }) => deadlineOrder, 'asc'),
      }))

      return result
    },
    [timeGrouping],
  )
}
