import { Hoverable } from '@lib/ui/base/Hoverable'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

import { useCurrentTaskFactory } from './CurrentTaskFactoryProvider'
import { TaskFactoryItemContent } from './TaskFactoryItemContent'

export const TaskFactoryItem = () => {
  const { id } = useCurrentTaskFactory()

  const [, setActiveItemId] = useActiveItemId()

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
