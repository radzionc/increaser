import { Task } from '@increaser/entities/Task'

export const specialTodoTaskGroups = ['overdue', 'todo'] as const
export type SpecialTodoTaskGroup = (typeof specialTodoTaskGroups)[number]

export const specialTodoTaskGroupName: Record<SpecialTodoTaskGroup, string> = {
  overdue: 'Overdue',
  todo: 'Todo (no deadline)',
}

export type TodoTaskGroupId = string | SpecialTodoTaskGroup

export const getGroupId = (task: Task): TodoTaskGroupId => {
  if (task.deadlineAt === null) {
    return 'todo'
  }

  return task.deadlineAt < Date.now() ? 'overdue' : task.deadlineAt.toString()
}
