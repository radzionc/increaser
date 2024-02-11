import { Task } from '@increaser/entities/Task'
import { getRecord } from '@lib/utils/record/getRecord'
import { endOfDay } from 'date-fns'

const tasks = [
  'Record a YouTube video',
  'Finish reading a book',
  'Submit a report at a job',
]

export const getDemoTasks = (): Record<string, Task> => {
  const startedAt = Date.now()

  return getRecord(
    tasks.map((name, order) => ({
      id: name,
      name,
      startedAt,
      isCompleted: false,
      deadlineAt: endOfDay(startedAt).getTime(),
      order,
    })),
    (task) => task.id,
  )
}
