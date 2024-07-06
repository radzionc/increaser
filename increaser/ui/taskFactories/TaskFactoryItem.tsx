import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentTaskFactory } from './CurrentTaskFactoryProvider'
import { EditTaskFactoryForm } from './form/EditTaskFactoryForm'

import { TaskFactoryItemContent } from './TaskFactoryItemContent'
import { Hoverable } from '@lib/ui/base/Hoverable'

export const TaskFactoryItem = () => {
  const { id } = useCurrentTaskFactory()

  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (activeItemId === id) {
    return <EditTaskFactoryForm />
  }

  return (
    <Hoverable
      verticalOffset={0}
      onClick={() => {
        setActiveItemId(id)
      }}
    >
      <TaskFactoryItemContent />
    </Hoverable>
  )
}
