import { match } from '@lib/utils/match'
import { TaskTimeGrouping } from '../timeGrouping/TaskTimeGrouping'
import { endOfDay } from 'date-fns'
import { getWeekEndedAt } from '@lib/utils/time/getWeekEndedAt'

export type ScheduledTaskGroupId = string | 'overdue'

type GetGroupIdInput = {
  deadlineAt: number
  timeGroup: TaskTimeGrouping
}

export const getGroupId = ({
  deadlineAt,
  timeGroup,
}: GetGroupIdInput): ScheduledTaskGroupId => {
  return deadlineAt < Date.now()
    ? 'overdue'
    : match(timeGroup, {
        day: () => endOfDay(deadlineAt).getTime(),
        week: () => getWeekEndedAt(deadlineAt),
      }).toString()
}
