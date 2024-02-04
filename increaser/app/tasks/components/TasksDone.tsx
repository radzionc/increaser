import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentTaskProvider } from './CurrentTaskProvider'
import { TaskItem } from './TaskItem'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { isEmpty } from '@lib/utils/array/isEmpty'

export const TasksDone = () => {
  const { tasks } = useAssertUserState()

  const completedTasks = Object.values(tasks).filter(
    (task) => !!task.completedAt,
  )
  return (
    <VStack gap={20}>
      <ShyInfoBlock>
        {isEmpty(completedTasks)
          ? `Tasks you've completed will be shown here. Keep up the good work!`
          : 'Completed tasks automatically clear each week, offering a fresh start and organized view.'}
      </ShyInfoBlock>
      <VStack gap={4}>
        {completedTasks.map((task) => (
          <CurrentTaskProvider value={task} key={task.id}>
            <TaskItem />
          </CurrentTaskProvider>
        ))}
      </VStack>
    </VStack>
  )
}
