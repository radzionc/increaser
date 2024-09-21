import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

import { Hoverable } from '@lib/ui/base/Hoverable'
import { EditTaskFactoryOverlay } from './EditTaskFactoryOverlay'
import { useCurrentTaskFactory } from '../../taskFactories/CurrentTaskFactoryProvider'
import { TaskFactoryItemContent } from '../../taskFactories/TaskFactoryItemContent'

export const GoalTaskFactoryItem = () => {
  const { id } = useCurrentTaskFactory()

  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (activeItemId === id) {
    return <EditTaskFactoryOverlay />
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
