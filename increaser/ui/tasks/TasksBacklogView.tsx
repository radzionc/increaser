import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { TasksBacklog } from './TasksBacklog'
import { VStack } from '@lib/ui/layout/Stack'
import { CreateTask } from './CreateTask'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { useBacklog } from './hooks/useBacklog'

export const TasksBacklogView = () => {
  const tasks = useBacklog()
  return (
    <ActiveItemIdProvider initialValue={null}>
      <VStack>
        <TasksBacklog />
        <CreateTask
          order={getLastItemOrder(tasks.map((task) => task.order))}
          deadlineType={null}
        />
      </VStack>
    </ActiveItemIdProvider>
  )
}
