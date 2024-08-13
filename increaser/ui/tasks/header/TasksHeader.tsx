import { HStack } from '@lib/ui/layout/Stack'
import { TasksViewSelector, useTasksView } from '@increaser/ui/tasks/TasksView'
import { ManageProjectFilter } from '../../projects/filter/ManageProjectFilter'
import { AddTask } from './AddTask'
import { TaskTimeGroupingSelector } from '../timeGrouping/TaskTimeGroupingSelector'

export const TasksHeader = () => {
  const { view } = useTasksView()

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
        {view === 'todo' && <TaskTimeGroupingSelector />}
        <ManageProjectFilter />
        <AddTask />
      </HStack>
    </HStack>
  )
}
