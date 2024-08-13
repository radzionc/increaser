import { HStack } from '@lib/ui/layout/Stack'
import { ManageProjectFilter } from '../../projects/filter/ManageProjectFilter'
import { AddTask } from './AddTask'
import { TaskTimeGroupingSelector } from '../timeGrouping/TaskTimeGroupingSelector'
import {
  TaskStatusFilter,
  useTaskStatusFilter,
} from '../status/TaskStatusFilter'

export const TasksHeader = () => {
  const [status] = useTaskStatusFilter()

  return (
    <HStack
      gap={20}
      fullWidth
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
    >
      <TaskStatusFilter />
      <HStack alignItems="center" gap={8}>
        {status === 'todo' && <TaskTimeGroupingSelector />}
        <ManageProjectFilter />
        <AddTask />
      </HStack>
    </HStack>
  )
}
