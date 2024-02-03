import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentTaskProvider } from './CurrentTaskProvider'
import { TaskItem } from './TaskItem'

export const TasksDone = () => {
  const { tasks } = useAssertUserState()

  const completedTasks = tasks.filter((task) => !!task.completedAt)
  return (
    <VStack gap={4}>
      {completedTasks.map((task) => (
        <CurrentTaskProvider value={task} key={task.id}>
          <TaskItem />
        </CurrentTaskProvider>
      ))}
    </VStack>
  )
}
