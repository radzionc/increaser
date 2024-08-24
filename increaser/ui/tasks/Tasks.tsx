import { TaskBoard } from './board/TaskBoard'
import { ProjectFilterProvider } from '../projects/filter/ProjectFilterProvider'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { ManageProjectFilter } from '../projects/filter/ManageProjectFilter'

export const Tasks = () => {
  return (
    <ProjectFilterProvider initialValue={null}>
      <PageHeaderControlsArea>
        <ManageProjectFilter />
      </PageHeaderControlsArea>
      <TaskBoard />
    </ProjectFilterProvider>
  )
}
