import { Match } from '@lib/ui/base/Match'
import { useTasksView } from './view/useTasksView'
import { TaskBoard } from './board/TaskBoard'
import { ScheduledTasksView } from './scheduled/ScheduledTasksView'
import { ProjectFilterProvider } from '../projects/filter/ProjectFilterProvider'
import { TaskStatusFilterProvider } from './status/TaskStatusFilter'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { ManageProjectFilter } from '../projects/filter/ManageProjectFilter'
import { TasksViewSelector } from './view/TasksViewSelector'

export const Tasks = () => {
  const [view] = useTasksView()

  return (
    <TaskStatusFilterProvider initialValue="todo">
      <ProjectFilterProvider initialValue={null}>
        <PageHeaderControlsArea>
          <ManageProjectFilter />
          <TasksViewSelector />
        </PageHeaderControlsArea>
        <Match
          value={view}
          board={() => <TaskBoard />}
          upcoming={() => <ScheduledTasksView />}
        />
      </ProjectFilterProvider>
    </TaskStatusFilterProvider>
  )
}
