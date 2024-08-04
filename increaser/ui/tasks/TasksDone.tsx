import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VStack } from '@lib/ui/layout/Stack'
import { CurrentTaskProvider } from './CurrentTaskProvider'
import { TaskItem } from './TaskItem'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useProjectFilter } from '../projects/filter/ProjectFilterProvider'

export const TasksDone = () => {
  const { tasks } = useAssertUserState()
  const [projectId] = useProjectFilter()

  const completedTasks = Object.values(tasks).filter((task) => {
    if (projectId && projectId !== task.projectId) {
      return false
    }
    return !!task.completedAt
  })

  return (
    <ActiveItemIdProvider initialValue={null}>
      <ShyInfoBlock>
        {isEmpty(completedTasks)
          ? `Tasks you've completed will be shown here. Keep up the good work!`
          : 'Completed tasks automatically clear each week, offering a fresh start and organized view.'}
      </ShyInfoBlock>
      <VStack>
        {completedTasks.map((task) => (
          <CurrentTaskProvider value={task} key={task.id}>
            <TaskItem />
          </CurrentTaskProvider>
        ))}
      </VStack>
    </ActiveItemIdProvider>
  )
}
