import { AddTaskFactory } from '@increaser/ui/taskFactories/AddTaskFactory'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
import { TaskFactories } from './TaskFactories'

export const ManageTaskFactories = () => {
  return (
    <>
      <PageHeaderControlsArea>
        <AddTaskFactory />
      </PageHeaderControlsArea>
      <TaskFactories />
    </>
  )
}
