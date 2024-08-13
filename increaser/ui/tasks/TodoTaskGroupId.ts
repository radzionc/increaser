import { TaskTimeGrouping } from './timeGrouping/TaskTimeGrouping'
import { match } from '@lib/utils/match'
import { endOfDay } from 'date-fns'
import { getWeekEndedAt } from '@lib/utils/time/getWeekEndedAt'

export const specialTodoTaskGroups = ['overdue', 'todo'] as const
export type SpecialTodoTaskGroup = (typeof specialTodoTaskGroups)[number]

export const specialTodoTaskGroupName: Record<SpecialTodoTaskGroup, string> = {
  overdue: 'Overdue',
  todo: 'Todo (no deadline)',
}

export type TodoTaskGroupId = string | SpecialTodoTaskGroup

type GetGroupIdInput = {
  deadlineAt: number | null
  timeGroup: TaskTimeGrouping
}

export const getGroupId = ({
  deadlineAt,
  timeGroup,
}: GetGroupIdInput): TodoTaskGroupId => {
  if (deadlineAt === null) {
    return 'todo'
  }

  return deadlineAt < Date.now()
    ? 'overdue'
    : match(timeGroup, {
        day: () => endOfDay(deadlineAt).getTime(),
        week: () => getWeekEndedAt(deadlineAt),
      }).toString()
}
