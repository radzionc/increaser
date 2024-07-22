import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskItem } from '@increaser/ui/tasks/TaskItem'

import { useOverdueTasks } from '@increaser/ui/tasks/hooks/useOverdueTasks'

export const OverdueTasks = () => {
  const tasks = useOverdueTasks()

  return (
    <VStack gap={4}>
      <Text weight="semibold" size={12} color={'idle'}>
        OVERDUE
      </Text>
      <VStack>
        {tasks.map((task) => {
          return (
            <CurrentTaskProvider value={task} key={task.id}>
              <TaskItem />
            </CurrentTaskProvider>
          )
        })}
      </VStack>
    </VStack>
  )
}
