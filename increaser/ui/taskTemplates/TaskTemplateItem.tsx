import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { EditTaskTemplateForm } from './form/EditTaskTemplateForm'

import { TaskTemplateItemContent } from './TaskTemplateItemContent'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { useCurrentTaskTemplate } from './CurrentTaskFactoryProvider'

export const TaskTemplateItem = () => {
  const { id } = useCurrentTaskTemplate()

  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (activeItemId === id) {
    return <EditTaskTemplateForm />
  }

  return (
    <Hoverable
      verticalOffset={0}
      onClick={() => {
        setActiveItemId(id)
      }}
    >
      <TaskTemplateItemContent />
    </Hoverable>
  )
}
