import { match } from '@lib/utils/match'
import { TaskTimeGrouping } from '../timeGrouping/TaskTimeGrouping'
import { endOfDay } from 'date-fns'
import { endOfISOWeek } from 'date-fns'

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
        week: () => endOfISOWeek(deadlineAt).getTime(),
      }).toString()
}
