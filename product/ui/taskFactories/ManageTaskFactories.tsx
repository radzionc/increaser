import { PageHeaderControlsArea } from '@product/app/ui/page/header/PageHeaderControlsAreaProvider'
import { AddTaskFactory } from '@product/ui/taskFactories/AddTaskFactory'

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
