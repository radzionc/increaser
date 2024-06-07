import { useTodayTasks } from './useTodayTasks'

export const useTodayIncompleteTasks = () => {
  const tasks = useTodayTasks()

  return tasks.filter(({ completedAt }) => !completedAt)
}
