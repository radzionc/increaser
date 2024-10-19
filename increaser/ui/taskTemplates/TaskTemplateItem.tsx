import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

import { TaskTemplateItemContent } from './TaskTemplateItemContent'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { useCurrentTaskTemplate } from './CurrentTaskTemplateProvider'

export const TaskTemplateItem = () => {
  const { id } = useCurrentTaskTemplate()

  const [, setActiveItemId] = useActiveItemId()

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
