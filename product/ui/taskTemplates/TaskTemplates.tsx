import { PageHeaderControlsArea } from '@product/app/ui/page/header/PageHeaderControlsAreaProvider'

import { AddTaskTemplate } from './AddTaskTemplate'
import { TaskTemplatesContent } from './TaskTemplatesContent'

export const TaskTemplates = () => {
  return (
    <>
      <PageHeaderControlsArea>
        <AddTaskTemplate />
      </PageHeaderControlsArea>
      <TaskTemplatesContent />
    </>
  )
}
