import { AddTaskTemplate } from './AddTaskTemplate'
import { PageHeaderControlsArea } from '@increaser/app/ui/page/header/PageHeaderControlsAreaProvider'
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
