import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { TasksBacklog } from './TasksBacklog'
import { VStack } from '@lib/ui/layout/Stack'
import { CreateTask } from './CreateTask'

export const TasksBacklogView = () => {
  return (
    <ActiveItemIdProvider initialValue={null}>
      <VStack>
        <TasksBacklog />
        <CreateTask
          defaultValue={{
            deadlineAt: null,
          }}
        />
      </VStack>
    </ActiveItemIdProvider>
  )
}
