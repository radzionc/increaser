import { Task } from '@increaser/entities/Task'
import { ForecastedTask } from '@increaser/entities/TaskFactory'
import { getRecurringTaskDeadline } from './getRecurringTaskDeadline'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { getId } from '../shared/getId'

type Input = {
  task: ForecastedTask
  tasks: Task[]
}

export const generateTask = ({ task, tasks }: Input): Task => {
  const { cadence, deadlineIndex, willBeCreatedAt, factoryId } = task
  const deadlineAt = getRecurringTaskDeadline({
    cadence,
    deadlineIndex,
    at: willBeCreatedAt,
  })

  const status = 'todo'

  const order = getLastItemOrder(
    Object.values(tasks)
      .filter((task) => task.status === status)
      .map((task) => task.order),
  )

  const deadlineOrder = getLastItemOrder(
    Object.values(tasks)
      .filter((task) => task.deadlineAt === deadlineAt)
      .map((task) => task.deadlineOrder),
  )

  return {
    ...task,
    factoryId,
    startedAt: Date.now(),
    id: getId(),
    deadlineAt,
    order,
    deadlineOrder,
    status,
  }
}
