import { splitBy } from '@lib/utils/array/splitBy'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { isThisWeek } from '@lib/utils/time/isThisWeek'
import { Task } from '@product/entities/Task'
import { useUncompleteTasks } from '@product/ui/tasks/useUncompleteTasks'
import { useMemo } from 'react'

const isBacklogTaskEligible = (task: Task) => {
  if (!task.deadlineAt) return false

  const now = Date.now()

  return task.deadlineAt < now || isThisWeek(task.deadlineAt)
}

export const useFocusTasks = () => {
  const tasks = useUncompleteTasks()

  return useMemo(() => {
    const tasksInProgress: Task[] = []
    const tasksToDo: Task[] = []
    const tasksBacklog: Task[] = []

    tasks.forEach((task) => {
      if (task.status === 'backlog') {
        if (isBacklogTaskEligible(task)) {
          tasksBacklog.push(task)
        }

        return
      }

      if (task.status === 'inProgress') {
        tasksInProgress.push(task)
        return
      }

      if (task.status === 'todo') {
        tasksToDo.push(task)
        return
      }
    })

    return [tasksInProgress, tasksToDo, tasksBacklog]
      .map((tasks) =>
        splitBy(tasks, (task) => (task.deadlineAt ? 0 : 1))
          .map((tasks) => sortEntitiesWithOrder(tasks))
          .flat(),
      )
      .flat()
  }, [tasks])
}
