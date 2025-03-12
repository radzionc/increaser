import { Hoverable } from '@lib/ui/base/Hoverable'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

import { useCurrentTaskTemplate } from './CurrentTaskTemplateProvider'
import { TaskTemplateItemContent } from './TaskTemplateItemContent'

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
