import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { OnFinishProp } from '@lib/ui/props'
import { ExpandableSelectorContainer } from '@lib/ui/select/ExpandableSelectorContainer'
import { TaskChecklistItem } from '@product/entities/Task'

import { getTaskChecklistItemInitialValue } from './getTaskChecklistItemInitialValue'
import { useIsChecklistOpen } from './state/isChecklistOpen'

export const AddTaskChecklist = ({
  onFinish,
}: OnFinishProp<TaskChecklistItem[]>) => {
  const [, setIsOpen] = useIsChecklistOpen()

  return (
    <ExpandableSelectorContainer
      title="Add sub-tasks"
      onClick={() => {
        setIsOpen(true)
        onFinish([getTaskChecklistItemInitialValue()])
      }}
    >
      <CheckSquareIcon />
    </ExpandableSelectorContainer>
  )
}
