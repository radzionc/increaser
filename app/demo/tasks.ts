import { Task } from 'tasks/Task'

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
  }))
}
