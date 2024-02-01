import { Task } from '@increaser/entities/Task'
import { endOfDay } from 'date-fns'

const tasks = [
  'Record a YouTube video',
  'Finish reading a book',
  'Submit a report at a job',
]

export const getDemoTasks = (): Task[] => {
  const startedAt = Date.now()

  return tasks.map((name) => ({
    id: name,
    name,
    startedAt,
    isCompleted: false,
    deadlineAt: endOfDay(startedAt).getTime(),
  }))
}
