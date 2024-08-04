import { HStack } from '@lib/ui/layout/Stack'
import { TasksViewSelector } from '@increaser/ui/tasks/TasksView'
import { ManageProjectFilter } from '../../projects/filter/ManageProjectFilter'
import { AddTask } from './AddTask'

export const TasksHeader = () => {
  return (
    <HStack
      gap={20}
      fullWidth
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
    >
      <TasksViewSelector />
      <HStack alignItems="center" gap={8}>
        <ManageProjectFilter />
        <AddTask />
      </HStack>
    </HStack>
  )
}
