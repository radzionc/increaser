import { TasksToDo } from '@increaser/ui/tasks/TasksToDo'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'

export const TasksToDoView = () => (
  <ActiveItemIdProvider initialValue={null}>
    <TasksToDo />
  </ActiveItemIdProvider>
)
